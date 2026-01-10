import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, Stars, useProgress, Center, Preload } from '@react-three/drei';
import { Suspense, useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';



// 🟢 1. HELPER: Detect Mobile Screen
// 🟢 1. HELPER: Detect Mobile AND Tablet
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 🟢 CHANGED: Increased from 768 to 1024 to include iPad Air/Mini/Pro
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    
    checkMobile(); 
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
// Preload the heavy model
// Preload models for smoother experience
useGLTF.preload('./assets/models/scene.gltf');
useGLTF.preload('./assets/models/base2.glb'); // Preload the new GLB

// 🟢 FIXED LOADER
function CanvasLoader() {
  const { progress } = useProgress();
  const [startFade, setStartFade] = useState(false);
  const [removeDom, setRemoveDom] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const t1 = setTimeout(() => { setStartFade(true); }, 1000);
      const t2 = setTimeout(() => { setRemoveDom(true); }, 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress]);

  if (removeDom) return null;

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: '#000000', 
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', 
        zIndex: 10000, opacity: startFade ? 0 : 1, 
        transition: 'opacity 1s ease-in-out', pointerEvents: 'none',
      }}
    >
      <div style={{ width: '300px', height: '300px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', zIndex:2 }}>
<DotLottieReact 
  src="/assets/models/load-animation.lottie" 
  loop 
  autoplay 
  onError={(err) => console.error("Lottie error:", err)}
/>  </div>
      <p style={{ color: '#F1F1F1', fontSize: '18px', fontWeight: 800, margin: '70px', fontFamily: 'monospace', letterSpacing: '2px', position: 'relative', zIndex: 2 }}>
        {progress.toFixed(0)}%
      </p>
    </div>
  );
}

function DesktopModel() {
  const { scene } = useGLTF('./assets/models/scene.gltf', true);
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport, camera } = useThree();
  const isMobile = useIsMobile(); // 🟢 Detect Mobile

  // 🟢 RESPONSIVE CONFIGURATION
  const config = isMobile 
    ? { 
        scale: 0.6,               
        pos: [0, -2.5, -3],       
        rot: [0, -90, -10]        
      }
    : { 
        scale: 0.92,              
        pos: [5.5, -3.5, -5],     
        rot: [0, -90, -20]        
      };

  useEffect(() => {
    if (hovered) document.body.style.cursor = 'grab';
    return () => { if(hovered) document.body.style.cursor = 'auto'; }
  }, [hovered]);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child.isMesh) {
            child.geometry.dispose();
            if (child.material.isMaterial) child.material.dispose();
        }
      });
    };
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const baseSpeed = viewport.height / window.innerHeight;
      
      const distToObj = camera.position.z - config.pos[2]; 
      const distToCam = camera.position.z;              
      const depthFactor = distToObj / distToCam;         
      const pixelsToUnits = baseSpeed * depthFactor;
      
      groupRef.current.position.y = config.pos[1] + (scrollY * pixelsToUnits);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={config.pos}
      rotation={[config.rot[0] * (Math.PI/180), config.rot[1] * (Math.PI/180), config.rot[2] * (Math.PI/180)]}
    >
      <PresentationControls 
        global={false} cursor={false} snap={true} speed={2} zoom={1} 
        polar={[-0.2, 0.2]} azimuth={[-0.5, 0.5]} 
      >
        <primitive 
            object={scene} 
            scale={config.scale} 
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        />
      </PresentationControls>
    </group>
  );
}

// 🟢 UPDATED: Sculpture Component using base2.glb
function Sculpture() {
  // Switched from OBJLoader to useGLTF
  const { scene } = useGLTF('./assets/models/base2.glb');
  const scrollGroupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport, camera } = useThree();
  const isMobile = useIsMobile(); 

  const config = isMobile 
    ? { scale: 1.2, pos: [0, -1.5, -3], targetY: -3.45 }
    : { scale: 1.5, pos: [3.5, -2, -1], targetY: -1.3 };

  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFD700',
      metalness: 1.0,
      roughness: 0.15,
      envMapIntensity: 2.0,
      side: THREE.DoubleSide, 
    });
  }, []);

  useLayoutEffect(() => {
    // Traverse the GLB scene to apply the gold material
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = goldMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, goldMaterial]);

  useFrame((state) => {
    if (scrollGroupRef.current) {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      const distanceFromBottom = fullHeight - windowHeight - scrollY;
      const baseSpeed = viewport.height / window.innerHeight;
      const distToObj = camera.position.z - config.pos[2]; 
      const pixelsToUnits = baseSpeed * (distToObj / camera.position.z);
      const targetY = config.targetY - (distanceFromBottom * pixelsToUnits);
      
      scrollGroupRef.current.position.y = Math.min(targetY, -1.5);
      scrollGroupRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.05;
      scrollGroupRef.current.position.x = config.pos[0];
      scrollGroupRef.current.position.z = config.pos[2];
    }
  });

  return (
    <group ref={scrollGroupRef} position={config.pos}>
       <PresentationControls global={false} cursor={false} snap={false} speed={2.5} zoom={1} polar={[-Infinity, Infinity]} azimuth={[-Infinity, Infinity]}>
        <Center>
            <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                {/* Invisible hit box for easier interaction */}
                <mesh visible={true}><boxGeometry args={[4, 5, 4]} /><meshBasicMaterial transparent opacity={0} /></mesh>
                <primitive object={scene} scale={config.scale} rotation={[0, -0.2, 0]} />
            </group>
        </Center>
      </PresentationControls>
      <pointLight position={[2, 2, 2]} intensity={25} color="#FFD700" />
      <pointLight position={[-2, -2, -2]} intensity={10} color="#ffffff" />
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <CanvasLoader />
      <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 0 }}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ alpha: true, preserveDrawingBuffer: true }} 
          style={{ background: 'transparent' }} 
          dpr={[1, 2]} 
          shadows
        >
          <Environment preset="city" /> 
          <hemisphereLight intensity={2.5} groundColor="black" color="#ffffff" />
          <spotLight position={[0, 50, 10]} angle={0.12} penumbra={1} intensity={4} color="white" castShadow />
          <pointLight position={[-10, -10, -10]} intensity={3} color="#915eff" />
          
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={2} />
            <DesktopModel />
            <Sculpture />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
