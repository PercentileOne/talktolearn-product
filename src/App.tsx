import { useState } from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import VideoFeed from './components/VideoFeed'
import UserProfile from './components/UserProfile'
import TeachToLearnSection from './components/TeachToLearnSection'
import CardFlowSection from './components/CardFlowSection'
import IpadWalkthroughSection from './components/IpadWalkthroughSection'
import VideoSection from './components/VideoSection'
import ChallengeSection from './components/ChallengeSection'
import ScoringSection from './components/ScoringSection'
import CertificationSection from './components/CertificationSection'
import WhoItsForSection from './components/WhoItsForSection'
import ParentSection from './components/ParentSection'
import GlobalLanguageSection from './components/GlobalLanguageSection'
import LiveStageSection from './components/LiveStageSection'
import SocialSharingSection from './components/SocialSharingSection'
import PricingSection from './components/PricingSection'
import TestimonialsSection from './components/TestimonialsSection'
import RoadmapSection from './components/RoadmapSection'
import Footer from './components/Footer'

export default function App() {
  const [showFeed, setShowFeed] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  // Expose globally so HeroSection CTA can trigger the feed
  ;(window as unknown as Record<string, unknown>).__openVideoFeed = () => setShowFeed(true)
  ;(window as unknown as Record<string, unknown>).__openUserProfile = () => setShowProfile(true)

  return (
    <>
      {showFeed && <VideoFeed onClose={() => setShowFeed(false)} />}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      <NavBar />
      <HeroSection />
      <TeachToLearnSection />
      <LiveStageSection />
      <CardFlowSection />
      <IpadWalkthroughSection />
      <VideoSection />
      <ChallengeSection />
      <ScoringSection />
      <CertificationSection />
      <WhoItsForSection />
      <ParentSection />
      <GlobalLanguageSection />
      <SocialSharingSection />
      <RoadmapSection />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
