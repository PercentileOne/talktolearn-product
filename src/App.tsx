import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
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
import Footer from './components/Footer'

export default function App() {
  return (
    <>
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
      <PricingSection />
      <Footer />
    </>
  )
}
