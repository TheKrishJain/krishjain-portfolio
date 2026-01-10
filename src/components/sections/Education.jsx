import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const educationData = [
  {
    title: "Bachelor's of Science in Information Technology",
    place: "VSIT, University of Mumbai",
    date: "2022 - 2025",
    desc: "Graduated as one of the college topper (CGPA: 9.87) with strong foundations in software development, databases, and data analytics. Focused on building real-world projects alongside academics, including full-stack systems and AI-powered applications."
  },
  {
    title: "HSC (Science)",
    place: "Jai Hind College, Mumbai",
    date: "2020 - 2022",
    desc: "Completed higher secondary education with a major in Physics, Chemistry, Mathematics and Computer Science"
  }
];

const EducationCard = ({ data }) => (
  <div className="experience-card" style={{
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '2.5rem', 
    color: '#fff',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  }}>
    {/* Institute Name (H3) */}
    <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
      {data.place}
    </h3>
    
    {/* Degree (H4) */}
    <h4 style={{ color: '#00d8ff', margin: '0 0 1.5rem 0', fontSize: '1.1rem', letterSpacing: '1px', fontWeight: '600' }}>
      {data.title} 
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
      {data.date}
    </div>
    <p style={{ lineHeight: '1.7', color: '#ddd', fontSize: '1.1rem', margin: 0 }}>{data.desc}</p>
  </div>
);

// 🟢 Responsive Styles Reuse
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
        padding-top: 100px !important;
      }
      .timeline-grid {
        grid-template-columns: 50px 1fr;
        gap: 10px;
      }
      .timeline-line {
        left: 23px;
      }
      .experience-card {
        padding: 1.5rem !important;
      }
    }
  `}</style>
);

export default function Education() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] 
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotColor = useTransform(scrollYProgress, [0.6, 0.7], ["#1a1a1a", "#00d8ff"]);
  const dotShadow = useTransform(scrollYProgress, [0.75, 0.8], ["none", "0 0 30px #00d8ff"]);

  return (
    <section className="section-wrapper" style={{ minHeight: '100vh', paddingBottom: '0px', zIndex: 20 }}>
      <TimelineStyles />
      
      <h2 className="section-title" style={{ fontSize: '4.5rem', marginBottom: '5rem', color: '#fff', textAlign: 'center', paddingTop: '150px', fontWeight: 'bold' }}>
        Education
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

        {/* --- ITEM 1: B.Sc IT --- */}
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
                <EducationCard data={educationData[0]} />
            </motion.div>
        </div>

        {/* --- ITEM 2: HSC --- */}
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
                <EducationCard data={educationData[1]} />
            </motion.div>
        </div>

      </div>
    </section>
  );
}