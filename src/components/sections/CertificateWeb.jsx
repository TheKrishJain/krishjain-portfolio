import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Import images statically via Vite
const images = import.meta.glob('/public/certificates/*.{png,jpg,jpeg,webp,svg}', { eager: true });
const certificateUrls = Object.keys(images).map(key => {
  // Extract the filename from the path
  const url = key.replace('/public', '');
  return {
    url,
    randomRotate: Math.random() * 40 - 20,
    randomX: Math.random() * 100 - 50,
    randomY: Math.random() * 100 - 50
  };
});

// Helper hook for media queries
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

const CertificateWeb = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const containerRef = useRef(null);

  // Z-index management to bring active card to front
  const [topZIndex, setTopZIndex] = useState(10);

  // Unused handleDragStart

  return (
    <section
      id="certifications"
      className="section-wrapper"
      style={{
        minHeight: '100vh',
        paddingBottom: '0px',
        zIndex: 20,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '150px'
      }}
    >
      <h2
        className="section-title"
        style={{
          fontSize: isMobile ? '3rem' : '4.5rem',
          marginBottom: '5rem',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(0, 216, 255, 0.5)' // Glowing effect
        }}
      >
        Certifications & Achievements
      </h2>

      {isMobile ? (
        // MOBILE VIEW: Horizontal swipeable carousel
        <div style={{
          width: '100%',
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '20px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
          msOverflowStyle: 'none' // Hide scrollbar in IE/Edge
        }}>
          <style>{`
            div::-webkit-scrollbar {
              display: none; // Hide scrollbar in Chrome/Safari
            }
          `}</style>

          {certificateUrls.map((cert, idx) => (
            <div
              key={idx}
              style={{
                scrollSnapAlign: 'center',
                flexShrink: 0,
                width: '80%',
                // Add negative margins for overlapping effect
                marginLeft: idx === 0 ? '0' : '-8%',
                marginRight: idx === certificateUrls.length - 1 ? '10%' : '0',
                position: 'relative',
                zIndex: certificateUrls.length - idx
              }}
            >
              <img
                src={cert.url}
                alt={`Certificate ${idx}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.75rem', // rounded-xl
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(255,255,255,0.2)', // deep shadow + inner highlight
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        // DESKTOP VIEW: Messy draggable pile
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            height: '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {certificateUrls.map((cert, idx) => {
            return (
              <motion.div
                key={idx}
                drag
                dragConstraints={containerRef}
                onDragStart={(e) => {
                  e.target.style.zIndex = topZIndex + 1;
                  setTopZIndex(topZIndex + 1);
                }}
                onHoverStart={(e) => {
                   e.target.style.zIndex = topZIndex + 1;
                   setTopZIndex(topZIndex + 1);
                }}
                initial={{
                  rotate: cert.randomRotate,
                  x: cert.randomX,
                  y: cert.randomY,
                  zIndex: idx
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(255,255,255,0.4)',
                  transition: { duration: 0.2 }
                }}
                whileDrag={{
                  scale: 1.05,
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(255,255,255,0.4)',
                  cursor: 'grabbing'
                }}
                style={{
                  position: 'absolute',
                  cursor: 'grab',
                  width: '400px',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <img
                  src={cert.url}
                  alt={`Certificate ${idx}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '0.75rem',
                    display: 'block',
                    pointerEvents: 'none' // Important so the drag event goes to the motion.div
                  }}
                  draggable="false"
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CertificateWeb;
