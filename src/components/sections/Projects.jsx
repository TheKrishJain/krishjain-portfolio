import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// 🟢 RESPONSIVE STYLES & SCROLL FIX
const ProjectStyles = () => (
  <style>{`
    /* 1. Stop Layout Shift */
    html {
      scrollbar-gutter: stable;
    }

    /* 2. Responsive Grid */
    .project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Desktop default */
      gap: 2.8rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* 3. Modal Responsive Layout */
    .modal-content-wrapper {
      padding: 2.5rem 2.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 25px;
    }
    
    .modal-body {
      padding: 1.5rem 2.5rem 2.5rem;
    }

    .modal-header-text {
      text-align: left;
    }

    /* MOBILE ADJUSTMENTS (< 768px) */
    @media (max-width: 768px) {
      .project-grid {
        grid-template-columns: 1fr; /* Single column on mobile */
        gap: 1.5rem;
      }

      .modal-content-wrapper {
        flex-direction: column; /* Stack logo and text */
        text-align: center;
        padding: 2rem 1.5rem 1rem;
        gap: 15px;
      }

      .modal-header-text {
        text-align: center;
      }

      .modal-body {
        padding: 1rem 1.5rem 2rem;
      }
      
      h2.modal-title {
        font-size: 1.8rem !important;
      }
      
      .project-links {
        flex-direction: column;
      }
    }

    /* SCROLLBAR CUSTOMIZATION */
    .custom-scrollbar::-webkit-scrollbar { display: block !important; width: 6px !important; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #00d8ff; border-radius: 4px; }
    .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #00d8ff rgba(255, 255, 255, 0.05); }
  `}</style>
);

const projects = [
  { 
    id: 'soffee', 
    title: 'Soffee', 
    type: 'Frontend + Business',
    logo: '/assets/hdr/soffee.jpeg',
    logoRadius: '50%', 
    shortDesc: 'A premium, high-performance coffee product-display site.',
    problem: 'Many offline coffee brands lack an effective digital presence to visually showcase their products.',
    solution: "Built a high-performance product-focused coffee website designed to digitally showcase Recipes and Product Journey.",
    features: ['• Product-centric layout', '• Visual storytelling', '• Minimal UI'],
    tech: 'HTML • CSS3 • JavaScript',
    links: { primary: 'https://thekrishjain.github.io/Soffee/', primaryLabel: 'Live Demo 🚀', github: 'https://github.com/TheKrishJain/Soffee' }
  },
  { 
    id: 'portfolio', 
    title: 'WatchMyWealth', 
    type: 'Full-Stack Finance',
    logo: '/assets/hdr/wealth.png',
    logoRadius: '16px', 
    shortDesc: 'A personal finance tracking application for budgeting and visualization.',
    problem: 'Individuals struggle to track expenses, budgets, and savings in one place without selling data.',
    solution: 'Built a secure, self-hosted personal finance management tool with real-time SQL dashboards.',
    features: ['• Expense tracking', '• Budget Categorization', '• Real-time visualization'],
    tech: 'Java • MySQL • JDBC ',
    links: { primary: 'https://docs.google.com/document/d/12TmrIr515zWLEADqDvQ2E0foJnCA2jSb/edit', primaryLabel: 'Docs 🚀', github: 'https://github.com/TheKrishJain/Watch-My-Wealth' }
  },
  { 
    id: 'ai-saas', 
    title: 'Vidya', 
    type: 'Backend + AI System',
    shortDesc: 'An AI-powered chatbot to answer college admission queries.',
    problem: 'High manual workload for college staff answering repetitive admission questions.',
    solution: 'Built an AI chatbot that answers queries and provides analytics to admins.',
    features: ['• Dialogflow AI', '• Django API handling', '• Admin dashboard'],
    tech: 'Django • Python • Dialogflow',
    links: { primary: 'https://docs.google.com/document/d/1eMxhHdJses3fyJGBsQgJGprafB_vhvRM/edit', primaryLabel: 'API Docs 📄', github: 'https://github.com/TheKrishJain/Vidya-The-AI-Chatbot' }
  },
];

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const canvas = document.getElementById('canvas-container');
    if (canvas) canvas.style.pointerEvents = 'none';

    return () => {
      document.body.style.overflow = '';
      if (canvas) canvas.style.pointerEvents = '';
    };
  }, []);

  if (!project) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '15px' /* Reduced outer padding for mobile */
      }}
    >
      <motion.div
        data-lenis-prevent="true"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(0, 216, 255, 0.2)',
          borderRadius: '20px',
          maxWidth: '650px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 0 60px rgba(0, 216, 255, 0.15)',
          position: 'relative', overflow: 'hidden'
        }}
      >
        {/* HEADER */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative', background: '#0a0a0a', zIndex: 2 }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>✕</button>

            {/* Uses CSS class .modal-content-wrapper for responsive flex layout */}
            <div className="modal-content-wrapper">
              {project.logo && (
                <img 
                  src={project.logo} 
                  alt={`${project.title} logo`} 
                  style={{ 
                    width: '80px', height: '80px', objectFit: 'cover', 
                    borderRadius: project.logoRadius, 
                    border: '2px solid rgba(0, 216, 255, 0.2)',
                    boxShadow: '0 0 20px rgba(0, 216, 255, 0.1)'
                  }} 
                />
              )}
              <div className="modal-header-text">
                <h2 className="modal-title" style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 'bold', lineHeight: '1.1', margin: 0 }}>{project.title}</h2>
                <p style={{ color: '#00d8ff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px', fontWeight: '600', margin: '5px 0 0 0' }}>{project.type}</p>
              </div>
            </div>
        </div>

        {/* BODY */}
        <div className="custom-scrollbar modal-body" style={{ overflowY: 'auto', zIndex: 1 }}>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '15px', borderRadius: '12px', borderLeft: '3px solid #ff4d4d' }}>
                    <strong style={{ color: '#ff4d4d', display: 'block', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase' }}>Problem</strong>
                    <p style={{ color: '#ddd', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>{project.problem}</p>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '15px', borderRadius: '12px', borderLeft: '3px solid #00d8ff' }}>
                    <strong style={{ color: '#00d8ff', display: 'block', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase' }}>Solution</strong>
                    <p style={{ color: '#ddd', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>{project.solution}</p>
                </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.8rem' }}>Key Features</h4>
                <ul style={{ color: '#b0b0b0', paddingLeft: '1.2rem', lineHeight: '1.6', fontSize: '0.95rem' }}>{project.features.map((feat, i) => (<li key={i} style={{ marginBottom: '0.3rem' }}>{feat}</li>))}</ul>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>Tech Stack</h4>
                <p style={{ color: '#00d8ff', fontSize: '0.9rem', fontFamily: 'monospace', background: 'rgba(0, 216, 255, 0.1)', display: 'inline-block', padding: '5px 10px', borderRadius: '6px' }}>{project.tech}</p>
            </div>

            <div className="project-links" style={{ display: 'flex', gap: '1rem' }}>
                <a href={project.links.primary} target="_blank" rel="noreferrer" style={{ 
                    flex: 1, padding: '14px', borderRadius: '12px', textAlign: 'center', 
                    background: '#00d8ff', color: '#000', fontWeight: 'bold', textDecoration: 'none', 
                    fontSize: '0.95rem' 
                }}>
                    {project.links.primaryLabel}
                </a>
                <a href={project.links.github} target="_blank" rel="noreferrer" style={{ 
                    flex: 1, padding: '14px', borderRadius: '12px', 
                    border: '1px solid #333', color: '#fff', fontWeight: 'bold', textDecoration: 'none', 
                    background: 'rgba(255,255,255,0.05)', fontSize: '0.95rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                }}>
                    <img src="/assets/hdr/github.png" alt="GitHub" style={{ width: '20px', height: '20px' }} />
                    GitHub
                </a>
            </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="section-wrapper" style={{ padding: '80px 20px 150px 20px', zIndex: 20 }}>
      <ProjectStyles />

      <AnimatePresence>
        {selectedId && <ProjectModal project={projects.find(p => p.id === selectedId)} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>

      <h2 style={{ 
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', /* Responsive font size */
        marginBottom: '4rem', 
        color: '#fff', 
        textAlign: 'center', 
        fontWeight: '800', 
        letterSpacing: '-1px' 
      }}>
        Featured Projects
      </h2>
      
      {/* Uses CSS class .project-grid for responsive columns */}
      <div className="project-grid">
        {projects.map((proj, index) => (
          <motion.div
            key={proj.id}
            layoutId={proj.id} 
            onClick={() => setSelectedId(proj.id)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, cursor: 'pointer', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(0, 216, 255, 0.5)', boxShadow: '0 20px 40px -15px rgba(0, 216, 255, 0.2)' }}
            style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.2rem', justifyContent: 'center', minHeight: '26px' }}>
                {proj.tech.split('•').slice(0,3).map((item, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', fontWeight: '600', color: '#00d8ff', background: 'rgba(0, 216, 255, 0.1)', padding: '4px 12px', borderRadius: '50px', letterSpacing: '0.5px' }}>{item.trim()}</span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: '700', lineHeight: '1.3', textAlign: 'center', background: 'linear-gradient(90deg, #ffffff, #a5f3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', minHeight: '3.9em', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                {proj.title}
              </h3>
            </div>
            <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.05rem', lineHeight: '1.7', margin: 0, textAlign: 'center' }}>{proj.shortDesc}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <span style={{ color: '#fff', fontWeight: '600', marginRight: '12px', fontSize: '0.95rem' }}>View Case Study</span>
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} style={{ color: '#00d8ff', fontSize: '1.2rem', display: 'block' }}>→</motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}