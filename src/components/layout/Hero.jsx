import { motion } from 'framer-motion';

// 🟢 RESPONSIVE STYLES
const HeroStyles = () => (
  <style>{`
    /* Default (Desktop) Styles */
    .hero-padding {
      padding-top: 130px;
      padding-left: 80px;
    }
    .hero-title {
      font-size: 4.5rem;
      line-height: 1.1;
    }
    .hero-subtitle {
      font-size: 2rem;
      margin-top: 20px;
      max-width: 700px;
      line-height: 1.5;
    }
    .decoration-line {
      height: 280px;
    }

    /* 📱 MOBILE STYLES (Phones) */
    @media (max-width: 768px) {
      .hero-padding {
        padding-top: 80px;  /* Move text up slightly */
        padding-left: 20px; /* Reduce left gap significantly */
        padding-right: 20px;
      }
      .hero-title {
        font-size: 2.5rem !important; /* Smaller Title */
      }
      .hero-subtitle {
        font-size: 1.1rem !important; /* Smaller Description */
        max-width: 90%;
        line-height: 1.4;
      }
      .decoration-line {
        height: 180px; /* Shorter purple line */
      }
    }
  `}</style>
);

export default function Hero() {
  return (
    <section className="section-wrapper hero-padding" style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      zIndex: 10,
      pointerEvents: 'none',
      boxSizing: 'border-box' // Prevents padding from breaking width
    }}>
      <HeroStyles />

      {/* TEXT CONTAINER */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '20px',
        width: 'fit-content',
        pointerEvents: 'auto'
      }}>

        {/* DECORATION (Purple Dot & Line) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#00d8ff' }} />
          <div className="decoration-line" style={{ width: '4px', background: 'linear-gradient(to bottom, #00d8ff, transparent)' }} />
        </div>

        {/* TEXT CONTENT */}
        <div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontWeight: '900', color: 'white' }}
          >
            Hi, I'm <span style={{ color: '#00d8ff' }}>Krish Jain,</span>
          </motion.h1>

          <motion.p
             className="hero-subtitle"
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             style={{
               color: '#cdf6fdff',
               fontWeight: '500',
             }}
          >
            I build software and make sure it works &mdash; full-stack builder with a QA and business-process mindset.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '30px',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: '#00d8ff',
                color: '#050816',
                fontWeight: '700',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'transform 0.2s',
                pointerEvents: 'auto',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Work with me
            </button>
            <a
              href="/assets/Krish_Resume.pdf"
              download="Krish_Resume.pdf"
              style={{
                backgroundColor: 'transparent',
                color: '#00d8ff',
                fontWeight: '700',
                padding: '10px 24px',
                borderRadius: '8px',
                border: '2px solid #00d8ff',
                cursor: 'pointer',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background-color 0.2s, color 0.2s, transform 0.2s',
                pointerEvents: 'auto',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 216, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Download CV
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}