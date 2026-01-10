import React from 'react';

export default function Lights() {
  return (
    <>
      {/* 1. Main Key Light (Warm) - Highlights the face */}
      <spotLight 
        position={[5, 5, 5]} 
        intensity={2} 
        angle={0.5} 
        penumbra={1} 
        castShadow 
      />

      {/* 2. Rim Light (Blue/Cool) - Creates that sci-fi outline on the sculpture */}
      <spotLight 
        position={[-5, 5, -5]} 
        intensity={5} 
        color="#00d8ff" /* Cyan rim light */
        angle={0.5} 
        penumbra={1} 
      />

      {/* 3. Fill Light - So shadows aren't pitch black */}
      <ambientLight intensity={0.3} />
    </>
  );
}