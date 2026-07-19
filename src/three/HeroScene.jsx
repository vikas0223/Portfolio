import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

import roomModelUrl from '../assets/models/optimized-room.glb';

/* ── Room Scene (inner Three.js component) ── */
function RoomScene({ rotTarget }) {
  const gltf = useGLTF(roomModelUrl);
  const groupRef = useRef();

  /* Enhance materials — emissive screens + shadow setup */
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const matName = (child.material?.name || '').toLowerCase();
        const meshName = (child.name || '').toLowerCase();

        // Make monitor screens glow bright cyan
        if (
          matName.includes('screen') || meshName.includes('screen') ||
          matName.includes('display') || meshName.includes('display') ||
          matName.includes('monitor')
        ) {
          const modifyMaterial = (mat) => {
            const newMat = mat.clone();
            newMat.emissive = new THREE.Color('#4cd2ff');
            newMat.emissiveIntensity = 3.5;
            newMat.toneMapped = false;
            return newMat;
          };

          if (Array.isArray(child.material)) {
            child.material = child.material.map(m => modifyMaterial(m));
          } else {
            child.material = modifyMaterial(child.material);
          }
        }
      }
    });
  }, []);

  /* Subtle float + mouse-follow rotation */
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Float
    const elapsed = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(elapsed * 0.4) * 0.06;

    // Lerp toward rotTarget
    const factor = 1 - Math.pow(0.04, delta);
    groupRef.current.rotation.x += (rotTarget.current.x - groupRef.current.rotation.x) * factor;
    groupRef.current.rotation.y += (rotTarget.current.y - groupRef.current.rotation.y) * factor;
  });

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

/* ── Exported Canvas wrapper ── */
export default function RoomModel({ rotTarget }) {
  return (
    <Canvas
      camera={{ fov: 45, position: [6, 5, 9] }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor('#0c0b11', 1);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        camera.lookAt(-0.2, 2.3, -0.2);
      }}
    >
      {/* Dark navy-tinted background + depth fog */}
      <color attach="background" args={['#0c0b11']} />
      <fog attach="fog" args={['#0c0b11', 8, 22]} />

      {/* Very low cool-tinted ambient — keeps scene dark like the reference */}
      <ambientLight intensity={0.18} color="#8a9cff" />

      {/* Dim warm key from above-right — desk lamp direction */}
      <directionalLight position={[5, 8, 5]} intensity={0.5} color="#ffd4a0" />

      {/* Cool blue-purple fill from behind/left — night sky feel */}
      <directionalLight position={[-6, 4, -6]} intensity={0.25} color="#2a2d55" />

      {/* Cyan point light near monitors — screen glow bounce */}
      <pointLight position={[2.5, 1.2, 0.5]} intensity={1.8} color="#4cd2ff" distance={6} decay={2} />

      {/* Warm reddish accent near window/curtain area */}
      <pointLight position={[-1.5, 2, 1]} intensity={0.5} color="#ff6b4a" distance={5} decay={2} />

      {/* Subtle warm bounce from desk surface */}
      <pointLight position={[1, 0.2, 1.5]} intensity={0.3} color="#e8c88a" distance={4} decay={2} />

      {/* Night environment for subtle reflections */}
      <Environment preset="night" environmentIntensity={0.2} />

      <React.Suspense fallback={null}>
        <RoomScene rotTarget={rotTarget} />
      </React.Suspense>
    </Canvas>
  );
}

useGLTF.preload(roomModelUrl);
