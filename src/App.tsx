import HeroSection from "./HeroSection";
import { AboutSection } from './AboutSection';
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import FooterSection from "./FooterSection";
import Navbar from "./Navbar";

function App() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#cf8047]/30 selection:text-[#cf8047]">
      <Navbar/>
      <HeroSection />
      <AboutSection />
      <ExperienceSection/>
      <ProjectsSection/>
      <FooterSection />
    </main>
  );
}

export default App;