import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const workData = [
  {
    role: "Full Stack Web Developer Intern",
    company: "IEEE YOUNG PROFESSIONALS, BOMBAY SECTION",
    duration: "Dec 2022 - Jan 2023",
    desc: "Led 8 developers as elected Team Lead to oversee project strategy and delivery. Managed Frontend Development: Spearheaded the design and layout, using Figma to create website interface."
  },
  {
    role: "Community Management Intern",
    company: "Akudo",
    duration: "Sep 2021 - Jun 2022",
    desc: "Managed a team of 50+ Brand Ambassadors across the country. Spearheaded Akudo’s Discord Server, organizing and hosting events for the community. Worked alongside a team of interns to conduct final testing of the Akudo app, identifying bugs. Strategically engaged on competitors' social media platforms to capture a broader audience."
  }
];

const ExperienceCard = ({ data }) => (
  <div className="experience-card" style={{
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '2.5rem', 
    color: '#fff',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  }}>
    <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>{data.role}</h3>
    <h4 style={{ color: '#00d8ff', margin: '0 0 1.5rem 0', fontSize: '1.1rem', letterSpacing: '1px', fontWeight: '600' }}>
      {data.company.toUpperCase()}
    </h4>
    <div style={{ 
      display: 'inline-block', 
      background: 'rgba(0, 216, 255, 0.15)', 
      padding: '6px 16px', 
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      color: '#00d8ff',
      marginBottom: '1.5rem'
    }}>
      {data.duration}
    </div>
    <p style={{ lineHeight: '1.7', color: '#ddd', fontSize: '1.1rem', margin: 0 }}>{data.desc}</p>
  </div>
);

// 🟢 Responsive Styles for Timeline
const TimelineStyles = () => (
  <style>{`
    .timeline-grid {
      display: grid;
      grid-template-columns: 100px 1fr;
    }
    .timeline-line {
      left: 48px;
    }
    
    @media (max-width: 768px) {
      .section-title {
        font-size: 3rem !important;
      }
      .timeline-grid {
        grid-template-columns: 50px 1fr; /* Shrink left column */
        gap: 10px;
      }
      .timeline-line {
        left: 23px; /* Adjust line position for mobile */
      }
      .experience-card {
        padding: 1.5rem !important;
      }
    }
  `}</style>
);

export default function WorkExperience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] 
  });

  // Line draws down
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Dot Glow Logic
  const dotColor = useTransform(scrollYProgress, [0.6, 0.7], ["#1a1a1a", "#00d8ff"]);
  const dotShadow = useTransform(scrollYProgress, [0.75, 0.8], ["none", "0 0 30px #00d8ff"]);

  return (
    <section className="section-wrapper" style={{ minHeight: '100vh', paddingBottom: '0px' }}>
      <TimelineStyles />
      
      <h2 className="section-title" style={{ fontSize: '4.5rem', marginBottom: '5rem', color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
        Work Experience
      </h2>
      
      <div ref={containerRef} style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        
        {/* --- TIMELINE LINES --- */}
        <div className="timeline-line" style={{ 
            position: 'absolute', 
            top: '55px', 
            bottom: '0', 
            width: '4px', 
            borderLeft: '4px dashed #333', 
            zIndex: 0 
        }} />

        <motion.div 
            className="timeline-line"
            style={{ 
                position: 'absolute', 
                top: '55px', 
                width: '4px', 
                height: lineHeight, 
                background: '#00d8ff', 
                boxShadow: '0 0 20px #00d8ff',
                zIndex: 1,
                transformOrigin: 'top'
            }} 
        />

        {/* --- ITEM 1 ROW --- */}
        <div className="timeline-grid" style={{ marginBottom: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '3.0rem', zIndex: 2 }}>
                <div style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', 
                    background: '#00d8ff', boxShadow: '0 0 20px #00d8ff'
                }} />
            </div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <ExperienceCard data={workData[0]} />
            </motion.div>
        </div>

        {/* --- ITEM 2 ROW --- */}
        <div className="timeline-grid">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '3.0rem', zIndex: 2 }}>
                <motion.div 
                    style={{ 
                        width: '24px', height: '24px', borderRadius: '50%', 
                        backgroundColor: dotColor,
                        boxShadow: dotShadow
                    }}
                />
            </div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <ExperienceCard data={workData[1]} />
            </motion.div>
        </div>

      </div>
    </section>
  );
}