import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FooterStyles = () => (
  <style>{`
    .footer-wrapper {
      position: relative;
      z-index: 20;
      overflow: hidden;
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 10%;
      background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    }

    .footer-content { width: 100%; max-width: 600px; z-index: 2; }
    .sculpture-gap { display: none; }
    
    .footer-title { font-size: 3.5rem; color: #fff; margin-bottom: 1rem; line-height: 1.1; font-weight: 800; }
    
    /* 🟢 REFINED CONTACT HOVER */
    .contact-link { 
      text-decoration: none; 
      font-size: 1.3rem; 
      font-weight: bold; 
      color: #fff; 
      display: flex; 
      align-items: center; 
      gap: 10px;
      transition: all 0.3s ease;
    }
    .contact-link:hover {
      color: #00d8ff;
      transform: translateX(5px);
    }

    .social-links { display: flex; gap: 25px; align-items: center; flex-wrap: wrap; }

    /* 🟢 LINK HOVER ANIMATION */
    .hover-link {
      transition: all 0.3s ease;
      position: relative;
    }
    .hover-link:hover {
      color: #00d8ff !important;
      transform: translateY(-3px);
      text-shadow: 0 0 8px rgba(0, 216, 255, 0.6);
    }

    /* 📱 MOBILE ADJUSTMENTS */
    @media (max-width: 1024px) {
      .footer-wrapper {
        min-height: auto;
        padding: 0;
        background: transparent !important;
      }
      .footer-content { max-width: 100%; }
      .footer-top {
        background: #050816;
        padding: 60px 20px 20px 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        position: relative;
        z-index: 5;
      }
      .sculpture-gap {
        display: block;
        height: 350px;
        width: 100%;
        background: transparent;
      }
      .footer-bottom {
        background: #050816;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        position: relative;
        z-index: 5;
      }
      .footer-title { font-size: 2.2rem; }
      .contact-section { align-items: center; gap: 15px; margin-bottom: 20px !important; }
      .social-links { justify-content: center; gap: 20px; }
      .resume-modal-content { width: 95% !important; height: 80vh !important; }
    }
  `}</style>
);

function ResumeModal({ onClose }) {
  const resumeUrl = '/assets/Krish_Resume.pdf'; 

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)',
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
      }}
    >
      <motion.div
        className="resume-modal-content"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0a0a0a', border: '1px solid rgba(0, 216, 255, 0.2)',
          borderRadius: '20px', width: '90%', maxWidth: '800px', height: '85vh',
          display: 'flex', flexDirection: 'column', boxShadow: '0 0 60px rgba(0, 216, 255, 0.15)', overflow: 'hidden'
        }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0a' }}>
          <h3 style={{ color: '#fff', margin: 0, fontSize: '1.5rem' }}>My Resume</h3>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ flex: 1, background: '#1a1a1a', position: 'relative' }}>
          <iframe src={resumeUrl} title="Resume Preview" style={{ width: '100%', height: '100%', border: 'none' }} />
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '15px', background: '#0a0a0a' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #333', background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Close</button>
          <a href={resumeUrl} download="Krish_Jain_Resume.pdf" style={{ padding: '10px 20px', borderRadius: '8px', background: '#00d8ff', color: '#000', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>Download PDF ⬇</a>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Footer() {
  const [showResume, setShowResume] = useState(false);

  return (
    <footer className="footer-wrapper">
      <FooterStyles />
      <AnimatePresence>
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </AnimatePresence>

      <div className="footer-content">
        <div className="footer-top">
          <motion.h3 className="footer-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            Building at the intersection of  <br /> 
            <span style={{ color: '#00d8ff' }}>Technology and Business</span>
          </motion.h3>
          
          <p className="footer-desc" style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '2rem' }}>
           Actively seeking full-time roles and growth opportunities
          </p>

          <div className="contact-section" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="tel:+917021786016" className="contact-link">
                  <span style={{ color: '#00d8ff' }}>📞</span> +91 7021786016
              </a>
              <a href="mailto:krishjain2911@gmail.com" className="contact-link">
                  <span style={{ color: '#00d8ff' }}>✉️</span> krishjain2911@gmail.com
              </a>
          </div>

          <div className="social-links">
            <a href="https://linkedin.com/in/thekrishjain" target="_blank" rel="noreferrer" className="hover-link" style={navLinkStyle}>LinkedIn</a>
            <a href="https://github.com/TheKrishJain/" target="_blank" rel="noreferrer" className="hover-link" style={navLinkStyle}>GitHub</a>
            <a href="https://www.instagram.com/_krishjain" target="_blank" rel="noreferrer" className="hover-link" style={navLinkStyle}>Instagram</a>
            
            {/* 🟢 UPDATED RESUME BUTTON: White color, hover effect, and download icon */}
            <button 
              onClick={() => setShowResume(true)} 
              className="hover-link"
              style={{ 
                ...navLinkStyle, 
                background: 'none', 
                border: 'none', 
                padding: 0, 
                color: '#fff', /* Changed from #00d8ff to white */
                display: 'flex', alignItems: 'center', gap: '5px'
              }}
            >
              Resume ⬇
            </button>
          </div>
        </div>
        <div className="sculpture-gap"></div>
        <div className="footer-bottom">
          <p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}>© 2026 Krish Jain</p>
        </div>
      </div>
    </footer>
  );
}

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'inherit',
};