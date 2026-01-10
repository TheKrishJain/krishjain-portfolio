import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- ResumeModal (Unchanged) ---
function ResumeModal({ onClose }) {
  const resumeUrl = '/assets/Krish_Resume.pdf'; 

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 10001, 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px', // 🟢 Matches new sharp look
          width: '90%', maxWidth: '800px', height: '85vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0a' }}>
          <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Resume Preview</h3>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ flex: 1, background: '#1a1a1a', position: 'relative' }}>
          <iframe src={resumeUrl} title="Resume Preview" style={{ width: '100%', height: '100%', border: 'none' }} />
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '15px', background: '#0a0a0a' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #333', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>Close</button>
          <a href={resumeUrl} download="Krish_Jain_Resume.pdf" style={{ padding: '8px 16px', borderRadius: '8px', background: '#fff', color: '#000', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Download PDF <span>↓</span>
          </a>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

const NavbarStyles = () => (
  <style>{`
    .nav-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end; 
      padding: 10px 1.7% 0 0; /* 🟢 Reduced right padding from 4% to 2.5% to move it right */
      position: absolute; 
      top: 0;
      left: 0;
      z-index: 100;
    }
    .nav-pill {
      display: flex;
      gap: 16px;
      padding: 8px 18px;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 0.6rem; /* 🟢 Reduced border-radius for a sharper look */
    }
    .nav-item {
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      font-size: 0.7rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.3s ease;
      font-weight:bold;
    }
    .nav-item:hover { color: #00d8ff; font-weight:bold; }
    
    .resume-icon {
      font-size: 0.85rem;
      font-weight: bold;
    }

    /* 📱 RESPONSIVE */
    @media (max-width: 1024px) {
      .nav-wrapper { 
        justify-content: center; 
        padding-right: 0; 
      }
      .nav-pill { 
        gap: 12px; 
        padding: 6px 14px; 
        border-radius: 6px; /* Slightly tighter radius for smaller screens */
      }
      .nav-item { font-size: 0.6rem; }
    }

    @media (max-width: 480px) {
      .nav-pill {
        gap: 8px;
        padding: 6px 10px;
        flex-wrap: wrap; /* Allows links to wrap if the phone is too narrow */
        justify-content: center;
      }
    }
  `}</style>
);

export default function Navbar() {
  const [showResume, setShowResume] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <NavbarStyles />
      <AnimatePresence>
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </AnimatePresence>

      <header className="nav-wrapper">
        <nav className="nav-pill">
          <span className="nav-item" onClick={() => scrollToSection('experience')}>Work</span>
          <span className="nav-item" onClick={() => scrollToSection('education')}>Education</span>
          <span className="nav-item" onClick={() => scrollToSection('projects')}>Projects</span>
          <span className="nav-item" onClick={() => scrollToSection('skills')}>Skills</span>
          <span className="nav-item" onClick={() => scrollToSection('contact')}>Contact</span>
          <span className="nav-item" onClick={() => setShowResume(true)}>
            Resume <span className="resume-icon">↓</span>
          </span>
        </nav>
      </header>
    </>
  );
}