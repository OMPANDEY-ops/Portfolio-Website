import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/ui/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import HeroSection from '@/components/ui/HeroSection';
import AboutSection from '@/components/ui/AboutSection';
import TechStackSection from '@/components/ui/TechStackSection';
import ProjectsSection from '@/components/ui/ProjectsSection';
import CertificationsSection from '@/components/ui/CertificationsSection';
import LiteratureSection from '@/components/ui/LiteratureSection';
import ContactSection from '@/components/ui/ContactSection';
import AvatarCaptions from '@/components/ui/AvatarCaptions';
import SectionObserver from '@/components/ui/SectionObserver';
import MovableWorkstationPanel from '@/components/ui/MovableWorkstationPanel';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0B]">
      {/* Ambient Red Glow Background Gradients */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#E31B23]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#7A0C13]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <LoadingScreen />
      <Navbar />
      <CustomCursor />

      {/* Floating Movable Workstation Photo Panel (desktop) */}
      <MovableWorkstationPanel />
      
      {/* Main Content Stack */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <CertificationsSection />
        <LiteratureSection />
        <ContactSection />
      </div>

      {/* Voiceover Speech Captions HUD & Section Scroll Observer */}
      <AvatarCaptions />
      <SectionObserver />
    </main>
  );
}
