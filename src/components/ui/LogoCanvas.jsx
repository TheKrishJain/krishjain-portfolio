import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';

const HeadModel = () => {
  // 1. CHANGE: Load base2.obj for the logo
  const obj = useLoader(OBJLoader, '/assets/models/base2.obj');
  
  React.useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#C0C0C0', 
          roughness: 0.4,
          metalness: 0.8,
        });
      }
    });
  }, [obj]);

  return <primitive object={obj} scale={0.5} position={[0, -1, 0]} />;
};

export default function LogoCanvas() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setIsVisible(false);
      else setIsVisible(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      width: '120px',
      height: '120px',
      zIndex: 50,
      cursor: 'grab',
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'auto' : 'none',
      transition: 'opacity 0.5s ease'
    }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5}>
               <HeadModel />
            </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
      </Canvas>
    </div>
  );
}