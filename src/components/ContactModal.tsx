import { useState } from 'react'
import { track } from '../analytics'
import { X, Rocket, Mail, AlertCircle, Send, RotateCcw } from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mzdldjzz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (res.ok) { setStatus('sent'); track('contact_form_sent') } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px',
    background: '#F9FAFB', outline: 'none', color: '#0A0F1C',
    fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color .18s',
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: '#FFFFFF', borderRadius: '20px', padding: '36px 32px',
        width: '100%', maxWidth: '480px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
        animation: 'modal-in .25s cubic-bezier(.34,1.56,.64,1) both',
      }}>
        <style>{`@keyframes modal-in { from { opacity:0; transform:scale(.94) translateY(12px); } to { opacity:1; transform:none; } } @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0A0F1C', margin: 0, letterSpacing: '-.02em' }}>Get in Touch</h2>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0' }}>We'd love to hear from you 💙</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, padding: '3px 10px', borderRadius: 20, background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.35)' }}>
              <Rocket size={11} color='#D97706' strokeWidth={2.5} />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#D97706', letterSpacing: '0.06em' }}>Launching Soon</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><X size={14} color='#6B7280' strokeWidth={2.5} /></button>
        </div>

        {status === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={26} color='#10B981' strokeWidth={1.8} />
              </div>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 800, color: '#0A0F1C', marginBottom: '6px' }}>Message sent!</p>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>Thanks for reaching out — we'll get back to you soon.</p>
            <button onClick={onClose} style={{ padding: '10px 28px', borderRadius: '50px', background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Close</button>
          </div>
        ) : status === 'error' ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={26} color='#EF4444' strokeWidth={1.8} />
              </div>
            </div>
            <p style={{ fontSize: '16px', fontWeight: 800, color: '#0A0F1C', marginBottom: '6px' }}>Something went wrong</p>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>Please try again or email us directly at francis@talktolearn.app</p>
            <button onClick={() => setStatus('idle')} style={{ padding: '10px 28px', borderRadius: '50px', background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Try Again</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '.06em', display: 'block', marginBottom: '5px' }}>YOUR NAME</label>
                <input style={inputStyle} placeholder="Francis" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '.06em', display: 'block', marginBottom: '5px' }}>EMAIL</label>
                <input style={inputStyle} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '.06em', display: 'block', marginBottom: '5px' }}>SUBJECT</label>
              <input style={inputStyle} placeholder="I'd love to..." value={subject} onChange={e => setSubject(e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '.06em', display: 'block', marginBottom: '5px' }}>MESSAGE</label>
              <textarea
                style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' }}
                placeholder="Tell us what's on your mind..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', fontSize: '14px', fontWeight: 700, color: '#6B7280', cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" disabled={status === 'sending'} style={{ flex: 2, padding: '12px', borderRadius: '50px', background: 'linear-gradient(135deg,#1E4DD8,#2A5BFF)', color: '#fff', fontSize: '14px', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(30,77,216,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                {status === 'sending'
                  ? <><RotateCcw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
                  : <><Send size={14} strokeWidth={2} /> Send Message</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
