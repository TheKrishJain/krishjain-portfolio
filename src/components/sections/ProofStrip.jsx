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

    // We only animate if it's in view
    if (!inView) {
      setCount(0);
      return;
    }

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;
    // to prevent infinite loops and too fast intervals
    if (incrementTime < 10) incrementTime = 10;
    let step = (end / (totalMilSecDur * 1000 / incrementTime));
    if (step < 0.1) step = 0.1; // adjust for small numbers

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

  // format based on if it's float or int
  const formattedCount = Number.isInteger(parseFloat(to))
    ? Math.floor(count).toLocaleString('en-US')
    : count.toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '15px' }}>
      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#00d8ff' }}>
        {startString}{formattedCount}{endString}
      </div>
      <div style={{ fontSize: '0.9rem', color: '#cdf6fdff', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', marginTop: '5px', fontWeight: '500' }}>
        {label}
      </div>
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
    { num: 9.87, label: "CGPA", start: "", end: "" },
    { num: 100, label: "defects resolved", start: "", end: "+" },
    { num: 80, label: "fewer post-launch issues", start: "", end: "%" },
    { num: 50, label: "revenue built", start: "₹", end: "K" },
    { num: 3248, label: "community members", start: "", end: "+" },
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
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        background: 'rgba(5, 8, 22, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(0, 216, 255, 0.1)',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}
    >
      {stats.map((stat, index) => (
        <CountUp
          key={index}
          to={stat.num}
          label={stat.label}
          startString={stat.start}
          endString={stat.end}
          inView={inView}
        />
      ))}
    </motion.section>
  );
}
