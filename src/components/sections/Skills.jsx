import { motion } from "framer-motion";

// Data structure (Same as before)
const skillsData = {
  technical: [
    { label: "Languages", values: ["Python", "Java", "C++", "JavaScript"] },
    { label: "Web", values: ["HTML/CSS", "React", "Three.js", "Tailwind"] },
    { label: "Backend", values: ["Django", "Node.js", "Express", "REST APIs"] },
    { label: "Databases", values: ["MySQL", "MongoDB", "PostgreSQL"] },
    { label: "AI & Data", values: ["Dialogflow", "Tableau", "Pandas", "NumPy"] },
  ],
  tools: [
    { name: "VS Code", icon: "/assets/hdr/vscode.png" },
     { name: "Replit", icon: "/assets/hdr/replit.png"},
    { name: "GitHub", icon: "/assets/hdr/github.png" },
    { name: "Figma", icon: "/assets/hdr/figma.png" },
    { name: "Photoshop", icon: "/assets/hdr/photoshop.png" },
    { name: "ChatGPT", icon: "/assets/hdr/chatgpt.png" },
    { name: "Excel", icon: "/assets/hdr/excel.png" },
    { name: "Word", icon: "/assets/hdr/word.png" },
    { name: "PowerPoint", icon: "/assets/hdr/ppt.png" },
    { name: "Gemini", icon: "/assets/hdr/gemini.webp" },
    { name: "Perplexity", icon: "/assets/hdr/perplexity.avif"},
    { name: "Dialogflow", icon: "/assets/hdr/dialogflow.png"},
   
  ],
  business: [
    { icon: "💡", text: "Product Strategy" },
    { icon: "📈", text: "Data-Driven Decisions" },
    { icon: "👥", text: "Team Leadership" },
    { icon: "💬", text: "Communication" },
    { icon: "🚀", text: "Agile & Scrum" },
  ]
};

const SkillsStyles = () => (
  <style>{`
    .skills-container {
      max-width: 1200px;
      margin: 0 auto;
      width: 95%;
    }

    /* 🟢 DESKTOP: 3 Columns */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      align-items: stretch;
    }

    .skill-card {
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 2rem; 
      height: 100%; 
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px -5px rgba(0,0,0,0.3);
    }

    .skill-card:hover {
       transform: translateY(-5px);
       border-color: rgba(0, 216, 255, 0.4);
       box-shadow: 0 15px 30px -10px rgba(0, 216, 255, 0.15);
       background: rgba(255, 255, 255, 0.04);
    }

    .skill-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
      text-align: center;
      margin-bottom: 0.5rem;
      position: relative;
      z-index: 2;
    }
    
    .skill-title::after {
      content: '';
      display: block;
      width: 30px;
      height: 3px;
      background: #00d8ff;
      margin: 10px auto 0;
      border-radius: 2px;
      transition: width 0.3s ease;
    }
    .skill-card:hover .skill-title::after { width: 60px; }

    /* Tech Badges */
    .tech-content { display: flex; flex-direction: column; gap: 1rem; }
    .tech-group { display: flex; flex-direction: column; gap: 5px; }
    .tech-label { color: #00d8ff; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; opacity: 0.8; }
    .tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tech-badge { font-size: 0.8rem; color: #e0e0e0; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 4px 10px; border-radius: 50px; transition: all 0.3s ease; cursor: default; }
    .tech-badge:hover { background: rgba(0, 216, 255, 0.15); border-color: #00d8ff; color: #fff; }

    /* Tools Grid */
    .tools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; align-content: center; flex-grow: 1; }
    .tool-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 3px; background: rgba(255,255,255,0.03); border-radius: 12px; transition: all 0.3s ease; border: 1px solid transparent; }
    .tool-item:hover { background: rgba(255,255,255,0.08); border-color: rgba(0, 216, 255, 0.3); transform: translateY(-3px); }
    .tool-icon { width: 40px; height: 40px; object-fit: contain; filter: grayscale(100%) brightness(1.2); transition: all 0.3s ease; }
    .tool-item:hover .tool-icon { filter: grayscale(0%) brightness(1) drop-shadow(0 0 8px rgba(0,216,255,0.5)); transform: scale(1.1); }
    .tool-name { font-size: 0.70rem; color: #ccc; font-weight: 600; }

    /* Business List */
    .business-list { display: flex; flex-direction: column; gap: 1rem; flex-grow: 1; justify-content: center; }
    .business-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 12px; transition: all 0.3s ease; border: 1px solid transparent; }
    .business-item:hover { background: rgba(0, 216, 255, 0.1); border-color: rgba(0, 216, 255, 0.3); transform: translateX(5px); }
    .business-icon { font-size: 1.2rem; }
    .business-text { font-size: 0.95rem; color: #ddd; font-weight: 500; }

    /* 🟢 📱 RESPONSIVE ADJUSTMENTS */
    @media (max-width: 1024px) {
       .skills-grid { 
          grid-template-columns: 1fr; /* Stack vertically on mobile/tablet */
          max-width: 500px; 
          margin: 0 auto; 
          gap: 2rem; 
       }
       .section-title { 
          font-size: 3rem !important; 
          margin-bottom: 3rem !important; 
       }
       .skill-card { 
          min-height: auto; 
          padding: 1.8rem; /* Slightly tighter padding */
       }
       
       /* Better grid for tools on mobile */
       .tools-grid {
          grid-template-columns: repeat(3, 1fr); /* 3 icons per row on mobile looks better */
       }
    }
    
    @media (max-width: 480px) {
       .tools-grid { grid-template-columns: repeat(2, 1fr); } /* Back to 2 on very small phones */
       .section-title { font-size: 2.5rem !important; }
    }
  `}</style>
);

export default function Skills() {
  return (
    <section id="skills" className="section-wrapper" style={{ paddingBottom: '100px', position: 'relative', zIndex: 10 }}>
      <SkillsStyles />
      
      <div className="skills-container">
        <h2 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '3rem', color: '#fff', textAlign: 'center', fontWeight: '800', letterSpacing: '-1px' }}>
          Skills & <span style={{ color: '#00d8ff', textShadow: '0 0 30px rgba(0,216,255,0.4)' }}>Capabilities</span>
        </h2>

        <div className="skills-grid">
          
          {/* --- Card 1 --- */}
          <motion.div 
            className="skill-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="skill-title">Technical Skills</h3>
            <div className="tech-content">
              {skillsData.technical.map((group, index) => (
                <div key={index} className="tech-group">
                  <span className="tech-label">{group.label}</span>
                  <div className="tech-tags">
                    {group.values.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- Card 2 --- */}
          <motion.div 
            className="skill-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="skill-title">Tools & Platforms</h3>
            <div className="tools-grid">
              {skillsData.tools.map((tool, index) => (
                <div key={index} className="tool-item">
                  <img 
                    src={tool.icon} 
                    alt={tool.name} 
                    className="tool-icon"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  />
                  <span style={{display: 'none', fontSize: '2rem'}}>🛠️</span>
                  <span className="tool-name">{tool.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- Card 3 --- */}
          <motion.div 
            className="skill-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="skill-title">Business & Leadership</h3>
            <div className="business-list">
              {skillsData.business.map((item, index) => (
                <div key={index} className="business-item">
                  <span className="business-icon">{item.icon}</span>
                  <span className="business-text">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}