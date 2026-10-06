import Scene from './components/canvas/Scene';
import Hero from './components/layout/Hero';
import ProofStrip from './components/sections/ProofStrip';
import WorkExperience from './components/sections/WorkExperience';
import Education from './components/sections/Education';
import CertificateWeb from './components/sections/CertificateWeb';
import Projects from "./components/sections/Projects";
import Footer from "./components/sections/Footer"; 
import Skills from './components/sections/Skills';
import Navbar from './components/sections/Navbar';
import { useEffect, useState } from 'react';


const BackgroundOverlay = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity based on scroll.
      // Fully transparent at top (0), starts fading in around 100px down,
      // reaches max opacity (0.6) around 600px down.
      const scrollY = window.scrollY;
      const newOpacity = Math.min(0.6, Math.max(0, (scrollY - 100) / 500 * 0.6));
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      opacity: opacity,
      pointerEvents: 'none',
      zIndex: 5, /* Above Scene (zIndex:0) but behind Hero/Content (zIndex:10) */
      transition: 'opacity 0.1s ease-out'
    }} />
  );
};

const Home = () => (
  <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
    
    <style>{`
      .scroll-spacer {
        height: 30vh; 
      }
      @media (max-width: 768px) {
        .scroll-spacer {
          height: 10vh;
        }
      }
    `}</style>

    <BackgroundOverlay />
    <Navbar />
    <Scene />
    <Hero />
    <ProofStrip />

    <div className="scroll-spacer"></div>

    {/* 🟢 Content wrapped in IDs for Navbar linking */}
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
      
      <section id="experience">
        <WorkExperience />
      </section>

      <section id="education">
        <Education />
      </section>

      <CertificateWeb />

      <section id="projects">
        <Projects />
      </section>

      <section id="skills">
        <Skills/>
      </section>

      <section id="contact">
        <Footer />
      </section>

    </div>
  </div>
);

export default Home;