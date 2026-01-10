import React, { useLayoutEffect, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ModelAssets() {
  const globeRef = useRef();
  
  // 1. Load Models
  const mac = useGLTF('/assets/models/mac.glb');
  const msi = useGLTF('/assets/models/msi.glb');
  const globe = useGLTF('/assets/models/globe.glb');
  const sculpture = useLoader(OBJLoader, '/assets/models/base.obj');

  // 2. Animate the Globe (Slow rotation)
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1; // Rotate slowly
    }
  });

  // 3. Force Sculpture Material (Solid Gray Sci-Fi Look)
  useLayoutEffect(() => {
    sculpture.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#C0C0C0', // Slightly lighter gray for better visibility
          roughness: 0.4,
          metalness: 0.6,   // More metallic for that "statue" feel
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [sculpture]);

  return (
    <group dispose={null}>
      {/* --- CENTER: IDENTITY --- */}
      {/* I increased scale from 0.05 to 2.5 based on the "tiny dot" issue */}
      <primitive 
        object={sculpture} 
        position={[0, -2.5, 0]} // Lower it so the head is in the center of screen
        scale={2.5} 
        rotation={[0, 0, 0]} 
      />

      {/* --- BACKGROUND: AMBITION --- */}
      {/* Huge wireframe sphere behind you */}
      <primitive 
        ref={globeRef}
        object={globe.scene} 
        position={[0, 0, -4]} // Push it back behind the head
        scale={3.0}           // Massive scale to fill the background
        rotation={[0.2, 0, 0]} // Slight tilt
      />

      {/* --- LEFT: CREATION (Mac) --- */}
      <primitive 
        object={mac.scene} 
        position={[-3.5, 0, 1]} // Left and slightly forward
        rotation={[0, 0.5, 0]}  // Tilted towards the center
        scale={1.2} 
      />

      {/* --- RIGHT: GAMING/POWER (MSI) --- */}
      <primitive 
        object={msi.scene} 
        position={[3.5, -0.5, 1]} // Right and slightly forward
        rotation={[0, -0.5, 0]}   // Tilted towards the center
        scale={1.2} 
      />
    </group>
  );
}