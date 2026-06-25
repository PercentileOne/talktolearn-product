import { useState, useRef, useEffect } from 'react'
import { track } from '../analytics'
import { Target, Loader2, Mic, ChevronRight, CheckCircle2, AlertTriangle, Globe, RotateCcw, User, MessageSquare, Trophy, ThumbsUp, ThumbsDown } from 'lucide-react'

type Mood = 'friendly' | 'professional' | 'tough'
type Phase = 'setup' | 'generating' | 'asking' | 'answering' | 'scoring' | 'results'

interface QA { question: string; answer: string; scores?: Scores }
interface Scores { clarity: number; confidence: number; relevance: number; depth: number }

// ElevenLabs voice IDs — each panelist has a distinct character
const PANELISTS = [
  { name: 'Lord Warren',  title: 'Chairman',      voiceId: 'VR6AewLTigWG4xSOukaG' },
  { name: 'Diana Stone',  title: 'Senior Partner', voiceId: '21m00Tcm4TlvDq8ikWAM' },
  { name: 'R. Blake',     title: 'Chief Examiner', voiceId: 'yoZ06aMxZJJ28mfd3POQ' },
  { name: 'Lady Warren',  title: 'Vice Chairman',  voiceId: 'AZnzlk1XvdvUeBnXmlld' },
]

const MOOD_COLOR: Record<Mood, string> = {
  friendly:     '#10B981',
  professional: '#3B82F6',
  tough:        '#EF4444',
}

// ElevenLabs voice settings per mood
const MOOD_VOICE: Record<Mood, { stability: number; similarity_boost: number; style: number; speed: number }> = {
  friendly:     { stability: 0.75, similarity_boost: 0.80, style: 0.20, speed: 1.00 },
  professional: { stability: 0.85, similarity_boost: 0.75, style: 0.10, speed: 0.92 },
  tough:        { stability: 0.45, similarity_boost: 0.90, style: 0.40, speed: 0.88 },
}

const HIRED_THRESHOLD = 70

let currentAudio: HTMLAudioElement | null = null

async function speak(text: string, mood: Mood, voiceId: string) {
  // Stop any playing audio
  if (currentAudio) { currentAudio.pause(); currentAudio = null }

  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2',
        voice_settings: MOOD_VOICE[mood],
      }),
    })
    if (!res.ok) throw new Error('ElevenLabs error')
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    currentAudio = new Audio(url)
    currentAudio.play()
  } catch {
    // Fallback to browser TTS if ElevenLabs fails
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = mood === 'tough' ? 0.85 : 0.92
    window.speechSynthesis.speak(u)
  }
}

export default function PanelQA({ mood }: { mood: Mood }) {
  const [phase,    setPhase]    = useState<Phase>('setup')
  const [topic,    setTopic]    = useState('')
  const [questions, setQuestions] = useState<string[]>([])
  const [qIndex,   setQIndex]   = useState(0)
  const [qaLog,    setQaLog]    = useState<QA[]>([])
  const [transcript, setTranscript] = useState('')
  const [askerIdx,   setAskerIdx]   = useState(0)
  const [error,      setError]      = useState('')
  const [finalScore, setFinalScore] = useState<Scores | null>(null)

  const recogRef = useRef<any>(null)
  const accent   = MOOD_COLOR[mood]

  // ── Generate questions via Claude ──────────────────────────────────────────
  const generateQuestions = async () => {
    if (!topic.trim()) return
    setPhase('generating')
    setError('')
    try {
      const moodDesc = mood === 'tough' ? 'challenging and probing' : mood === 'friendly' ? 'warm and encouraging' : 'professional and neutral'
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 512,
          messages: [{
            role: 'user',
            content: `You are a ${moodDesc} interview panel. Generate exactly 5 interview questions about: "${topic}".
Rules:
- Questions should be ${moodDesc} in tone
- Mix easy and hard questions
- Make them specific to the topic
- Each question on its own line, no numbering, no bullets
- Questions only, nothing else`,
          }],
        }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      const lines = data.content[0].text.trim().split('\n').filter((l: string) => l.trim()).slice(0, 5)
      setQuestions(lines)
      setQIndex(0)
      setQaLog([])
      setAskerIdx(0)
      setPhase('asking')
      track('panel_qa_started', { topic, mood })
    } catch (e) {
      setError('Could not generate questions. Please try again.')
      setPhase('setup')
    }
  }

  // ── Speak question when phase becomes 'asking' ─────────────────────────────
  useEffect(() => {
    if (phase !== 'asking' || questions.length === 0) return
    const q = questions[qIndex]
    const asker = PANELISTS[askerIdx % PANELISTS.length]
    const prefix = mood === 'tough'
      ? `${asker.name}. `
      : mood === 'friendly'
      ? `Hi, I'm ${asker.name}. `
      : `${asker.name}. `
    setTimeout(() => speak(prefix + q, mood, asker.voiceId), 600)
  }, [phase, qIndex])

  // ── Speech recognition ─────────────────────────────────────────────────────
  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { setError('Speech recognition not supported in this browser. Try Chrome.'); return }
    const r = new SR()
    r.continuous = true
    r.interimResults = true
    r.lang = 'en-US'
    r.onresult = (e: any) => {
      const t = Array.from(e.results).map((res: any) => res[0].transcript).join(' ')
      setTranscript(t)
    }
    r.onerror = (e: any) => {
      if (e.error === 'not-allowed') setError('Microphone access denied. Please allow mic access in your browser and try again.')
      else if (e.error === 'no-speech') setError('No speech detected. Make sure your mic is working and try again.')
      else setError(`Mic error: ${e.error}. Please try again.`)
      setPhase('asking')
    }
    r.onend = () => {}
    recogRef.current = r
    r.start()
    setTranscript('')
    setPhase('answering')
    if (currentAudio) { currentAudio.pause(); currentAudio = null }
    window.speechSynthesis.cancel()
  }

  const stopListening = () => {
    recogRef.current?.stop()
  }

  // ── Score answer via Claude ────────────────────────────────────────────────
  const scoreAnswer = async () => {
    stopListening()
    if (!transcript.trim()) { setTranscript('(no answer given)') }
    setPhase('scoring')
    const question = questions[qIndex]
    const answer   = transcript.trim() || '(no answer given)'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 256,
          messages: [{
            role: 'user',
            content: `Score this interview answer. Question: "${question}" Answer: "${answer}"
Return ONLY a JSON object with these exact keys and integer values 0-100:
{"clarity":0,"confidence":0,"relevance":0,"depth":0}
No other text.`,
          }],
        }),
      })
      const data = await res.json()
      const scores: Scores = JSON.parse(data.content[0].text.trim())
      const newQA: QA = { question, answer, scores }
      const newLog = [...qaLog, newQA]
      setQaLog(newLog)

      if (qIndex + 1 >= questions.length) {
        // Final results
        const avg = (k: keyof Scores) => Math.round(newLog.reduce((s, q) => s + (q.scores?.[k] || 0), 0) / newLog.length)
        const scores = { clarity: avg('clarity'), confidence: avg('confidence'), relevance: avg('relevance'), depth: avg('depth') }
        setFinalScore(scores)
        track('panel_qa_completed', { topic, mood, score: String(Math.round((scores.clarity + scores.confidence + scores.relevance + scores.depth) / 4)) })
        setPhase('results')
      } else {
        setQIndex(i => i + 1)
        setAskerIdx(i => i + 1)
        setTranscript('')
        setPhase('asking')
      }
    } catch {
      setError('Scoring failed. Moving to next question.')
      const newLog = [...qaLog, { question, answer }]
      setQaLog(newLog)
      if (qIndex + 1 >= questions.length) { setPhase('results') }
      else { setQIndex(i => i + 1); setAskerIdx(i => i + 1); setTranscript(''); setPhase('asking') }
    }
  }

  const overallScore = finalScore
    ? Math.round((finalScore.clarity + finalScore.confidence + finalScore.relevance + finalScore.depth) / 4)
    : 0

  const reset = () => {
    if (currentAudio) { currentAudio.pause(); currentAudio = null }
    window.speechSynthesis.cancel()
    setPhase('setup'); setTopic(''); setQuestions([]); setQIndex(0)
    setQaLog([]); setTranscript(''); setFinalScore(null); setError('')
  }

  // ── RENDER ─────────────────────────────────────────────────────────────────
  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)', borderRadius: 16,
    border: `1px solid rgba(255,255,255,0.08)`, padding: '24px',
    marginTop: 16,
  }

  // Setup
  if (phase === 'setup') return (
    <div style={cardStyle}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${accent}22`, border: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={22} color={accent} strokeWidth={2} />
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#FFF', marginBottom: 4 }}>Panel Call Q&A</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>The panel will ask you 5 real questions. Answer out loud.</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
          <Globe size={11} color='rgba(255,255,255,0.30)' />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.30)', fontWeight: 600 }}>Best experienced in Chrome or Edge</span>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 8 }}>
          WHAT TOPIC SHOULD THEY GRILL YOU ON?
        </label>
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && generateQuestions()}
          placeholder='e.g. "My product idea" / "Climate change" / "My job application"'
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 10, border: `1px solid ${accent}44`,
            background: 'rgba(255,255,255,0.05)', color: '#FFF', fontSize: 14,
            outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', cursor: 'text',
          }}
        />
      </div>
      {error && <div style={{ color: '#EF4444', fontSize: 12, marginBottom: 12, textAlign: 'center' }}>{error}</div>}
      <button onClick={generateQuestions} disabled={!topic.trim()} style={{
        width: '100%', padding: '14px', borderRadius: 50, border: 'none',
        cursor: topic.trim() ? 'pointer' : 'default',
        background: topic.trim() ? accent : 'rgba(255,255,255,0.08)',
        color: topic.trim() ? '#FFF' : 'rgba(255,255,255,0.3)',
        fontSize: 14, fontWeight: 800,
        boxShadow: topic.trim() ? `0 8px 24px ${accent}44` : 'none',
        transition: 'all 0.3s ease',
        userSelect: 'none',
      }}>
        Enter the Panel Call →
      </button>
    </div>
  )

  // Generating
  if (phase === 'generating') return (
    <div style={{ ...cardStyle, textAlign: 'center', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <Loader2 size={32} color={accent} strokeWidth={2} style={{ animation: 'spin 1s linear infinite' }} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#FFF', marginBottom: 6 }}>The panel is preparing their questions...</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Topic: {topic}</div>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )

  // Asking / Answering / Scoring
  if (['asking', 'answering', 'scoring'].includes(phase)) {
    const asker = PANELISTS[askerIdx % PANELISTS.length]
    return (
      <div style={cardStyle}>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}>
            QUESTION {qIndex + 1} OF {questions.length}
          </div>
          <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
            <div style={{ height: '100%', borderRadius: 2, background: accent, width: `${((qIndex) / questions.length) * 100}%`, transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* Asker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${accent}22`, border: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={16} color={accent} strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#FFF' }}>{asker.name}</div>
            <div style={{ fontSize: 10, color: `${accent}CC` }}>{asker.title}</div>
          </div>
          {phase === 'asking' && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'live-pulse 1s infinite' }} />
              <span style={{ fontSize: 10, color: accent, fontWeight: 700 }}>ASKING</span>
            </div>
          )}
        </div>

        {/* Question */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '16px', marginBottom: 16, borderLeft: `3px solid ${accent}` }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#FFF', lineHeight: 1.5 }}>
            "{questions[qIndex]}"
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertTriangle size={13} color='#FCA5A5' strokeWidth={2} />
              <p style={{ margin: 0, fontSize: 12, color: '#FCA5A5' }}>{error}</p>
            </div>
          </div>
        )}

        {/* Transcript */}
        {(phase === 'answering' || phase === 'scoring') && (
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px', marginBottom: 14, minHeight: 60, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', animation: 'live-pulse 1s infinite', flexShrink: 0 }} />
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)' }}>YOUR ANSWER</div>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: transcript ? '#FFF' : 'rgba(255,255,255,0.25)', fontStyle: transcript ? 'normal' : 'italic', lineHeight: 1.6 }}>
              {transcript || 'Listening — speak now...'}
            </p>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', gap: 10 }}>
          {phase === 'asking' && (
            <button onClick={startListening} style={{
              flex: 1, padding: '16px', borderRadius: 50, border: 'none', cursor: 'pointer',
              background: accent, color: '#FFF', fontSize: 15, fontWeight: 800,
              boxShadow: `0 8px 28px ${accent}55`, userSelect: 'none',
              letterSpacing: '0.01em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Mic size={18} strokeWidth={2} /> Answer Now
            </button>
          )}
          {phase === 'answering' && (
            <button onClick={scoreAnswer} style={{
              flex: 1, padding: '16px', borderRadius: 50, border: 'none', cursor: 'pointer',
              background: accent, color: '#FFF', fontSize: 15, fontWeight: 800,
              boxShadow: `0 8px 28px ${accent}55`, userSelect: 'none',
              letterSpacing: '0.01em',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {qIndex + 1 >= questions.length
                  ? <><Trophy size={17} strokeWidth={2} /> Finish &amp; See Results</>
                  : <><CheckCircle2 size={17} strokeWidth={2} /> Done — Next Question <ChevronRight size={16} strokeWidth={2.5} /></>}
              </span>
            </button>
          )}
          {phase === 'scoring' && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              <Loader2 size={16} color={accent} style={{ animation: 'spin 1s linear infinite' }} /> Scoring your answer...
            </div>
          )}
        </div>
      </div>
    )
  }

  // Results
  if (phase === 'results' && finalScore) {
    const hired = overallScore >= HIRED_THRESHOLD
    return (
      <div style={cardStyle}>
        {/* Verdict */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: hired ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${hired ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.35)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {hired ? <ThumbsUp size={28} color='#10B981' strokeWidth={2} /> : <ThumbsDown size={28} color='#EF4444' strokeWidth={2} />}
            </div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: hired ? '#10B981' : '#EF4444', marginBottom: 4, letterSpacing: '-0.03em' }}>
            {hired ? "You're Hired!" : "You're Fired!"}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            {hired ? 'Lord Warren nods slowly. "Impressive."' : 'R. Blake closes his notebook. "Next candidate."'}
          </div>
        </div>

        {/* Overall score */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: hired ? '#10B981' : '#EF4444', lineHeight: 1 }}>{overallScore}</div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}>OVERALL SCORE</div>
        </div>

        {/* Score breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {(['clarity', 'confidence', 'relevance', 'depth'] as (keyof Scores)[]).map(k => (
            <div key={k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: 4, textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: finalScore[k] >= 70 ? '#10B981' : finalScore[k] >= 50 ? '#F59E0B' : '#EF4444' }}>{finalScore[k]}</div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 6 }}>
                <div style={{ height: '100%', borderRadius: 2, width: `${finalScore[k]}%`, transition: 'width 1s ease', background: finalScore[k] >= 70 ? '#10B981' : finalScore[k] >= 50 ? '#F59E0B' : '#EF4444' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Q&A log */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <MessageSquare size={12} color='rgba(255,255,255,0.25)' strokeWidth={2} />
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)' }}>SESSION TRANSCRIPT</div>
          </div>
          {qaLog.map((qa, i) => (
            <div key={i} style={{ marginBottom: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `2px solid ${accent}44` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 4 }}>Q{i + 1}: {qa.question}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{qa.answer}</div>
            </div>
          ))}
        </div>

        <button onClick={reset} style={{
          width: '100%', padding: '14px', borderRadius: 50, border: 'none', cursor: 'pointer',
          background: accent, color: '#FFF', fontSize: 14, fontWeight: 800,
          boxShadow: `0 8px 24px ${accent}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <RotateCcw size={16} strokeWidth={2.5} /> Try Again
        </button>
      </div>
    )
  }

  return null
}
