import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// A simple count-up component for the numbers
const CountUp = ({ to, label, startString = "", endString = "", duration = 2, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(to);
    if (start === end) return;

    if (!inView) {
      return;
    }

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;
    if (incrementTime < 10) incrementTime = 10;
    let step = (end / (totalMilSecDur * 1000 / incrementTime));
    if (step < 0.1) step = 0.1;

    let current = 0;
    let timer = setInterval(() => {
      current += step;
      if (current >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(current);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to, duration, inView]);

  const formattedCount = Number.isInteger(parseFloat(to))
    ? Math.floor(count).toLocaleString('en-US')
    : count.toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#00FFFF' }}>
        {startString}{formattedCount}{endString}
      </div>
      <div style={{ fontSize: '0.9rem', color: '#cdf6fdff', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', marginTop: '5px', fontWeight: '500' }}>
        {label}
      </div>
    </div>
  );
};

const FlipCard = ({ stat, inView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '200px',
        height: '150px',
        perspective: '1000px',
        margin: '15px'
      }}
    >
      <motion.div
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div
          className="bg-white/5 backdrop-blur-md"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          <CountUp
            to={stat.num}
            label={stat.label}
            startString={stat.start}
            endString={stat.end}
            inView={inView}
          />
        </div>

        {/* Back */}
        <div
          className="bg-white/5 backdrop-blur-md"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px',
            textAlign: 'center',
            color: '#e2e8f0',
            fontSize: '0.9rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          <p>{stat.backText}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProofStrip() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const stats = [
    { num: 9.87, label: "CGPA", start: "", end: "", backText: "Top of the class academic excellence." },
    { num: 100, label: "defects resolved", start: "", end: "+", backText: "Through rigorous QA and low-code OutSystems analysis." },
    { num: 80, label: "fewer post-launch issues", start: "", end: "%", backText: "Achieved via comprehensive automated testing." },
    { num: 50, label: "revenue built", start: "₹", end: "K", backText: "Generated via scaling my e-commerce brand operations." },
    { num: 3248, label: "community members", start: "", end: "+", backText: "Grown an engaged tech community from scratch." },
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        hidden: { opacity: 0, y: 50 }
      }}
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        gap: '20px'
      }}
    >
      {stats.map((stat, index) => (
        <FlipCard key={index} stat={stat} inView={inView} />
      ))}
    </motion.section>
  );
}
