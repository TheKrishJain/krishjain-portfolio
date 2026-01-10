import Scene from './components/canvas/Scene';
import Hero from './components/layout/Hero';
import WorkExperience from './components/sections/WorkExperience';
import Education from './components/sections/Education';
import Projects from "./components/sections/Projects";
import Footer from "./components/sections/Footer"; 
import Skills from './components/sections/Skills';
import Navbar from './components/sections/Navbar';

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

    <Navbar />
    <Scene />
    <Hero />

    <div className="scroll-spacer"></div>

    {/* 🟢 Content wrapped in IDs for Navbar linking */}
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
      
      <section id="experience">
        <WorkExperience />
      </section>

      <section id="education">
        <Education />
      </section>

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