import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ── Color palette (matches contact form dark/gold theme) ── */
const C = {
  deskWood:  '#8b6914',   // warm wood
  deskEdge:  '#6b4f10',   // darker wood trim
  legs:      '#2a2a2a',   // dark metal legs
  beige:     '#d4c5a0',   // retro computer beige
  beigeDark: '#b8a87c',   // darker beige for sides
  screen:    '#0d1117',   // dark screen
  screenGlow:'#c9a96e',   // gold glow matching accent
  chair:     '#1a1a1a',   // dark chair
  chairCush: '#1e1e2a',   // dark cushion
  keyboard:  '#c8b88a',   // beige keyboard
  mouse:     '#bfae85',   // beige mouse
  paper:     '#e8dcc8',   // paper/notepad
};

/* ── CRT Monitor ── */
function CRTMonitor({ position = [0, 0, 0] }) {
  const screenMatRef = useRef();

  // Code editor screen texture
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    // Dark background
    ctx.fillStyle = '#0a0e14';
    ctx.fillRect(0, 0, 256, 200);

    // Scanline effect
    for (let y = 0; y < 200; y += 2) {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, y, 256, 1);
    }

    // Code lines with warm gold/amber tones
    const colors = ['#c9a96e', '#e8c88a', '#a89060', '#d4b87a', '#8b7340', '#c9a96e'];
    const widths = [100, 70, 120, 50, 90, 60, 110, 80, 130, 45, 75, 100, 55, 95];
    for (let i = 0; i < 14; i++) {
      const y = 15 + i * 12;
      const indent = (i % 4 === 0) ? 10 : (i % 3 === 0) ? 25 : (i % 2 === 0) ? 40 : 15;
      ctx.fillStyle = colors[i % colors.length];
      ctx.globalAlpha = 0.6 + Math.random() * 0.3;
      ctx.fillRect(indent, y, widths[i], 5);
      if (i % 3 === 0) {
        ctx.fillStyle = colors[(i + 3) % colors.length];
        ctx.globalAlpha = 0.4;
        ctx.fillRect(indent + widths[i] + 6, y, 35, 5);
      }
    }
    ctx.globalAlpha = 1;

    // Cursor
    ctx.fillStyle = '#c9a96e';
    ctx.fillRect(25, 75, 1.5, 10);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state) => {
    if (screenMatRef.current) {
      const t = state.clock.getElapsedTime();
      screenMatRef.current.emissiveIntensity = 0.6 + Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Monitor body — chunky CRT */}
      <RoundedBox args={[1.1, 0.9, 0.9]} radius={0.06} smoothness={4} position={[0, 0.45, 0]}>
        <meshStandardMaterial color={C.beige} roughness={0.6} metalness={0.05} />
      </RoundedBox>
      {/* Screen bezel inset */}
      <mesh position={[0, 0.48, 0.46]}>
        <planeGeometry args={[0.85, 0.65]} />
        <meshStandardMaterial color="#050508" />
      </mesh>
      {/* Screen display */}
      <mesh position={[0, 0.48, 0.461]}>
        <planeGeometry args={[0.78, 0.58]} />
        <meshStandardMaterial
          ref={screenMatRef}
          map={screenTexture}
          emissive={C.screenGlow}
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
      {/* Monitor stand base */}
      <RoundedBox args={[0.6, 0.06, 0.4]} radius={0.02} smoothness={4} position={[0, -0.02, 0.1]}>
        <meshStandardMaterial color={C.beigeDark} roughness={0.5} metalness={0.1} />
      </RoundedBox>
      {/* Power LED */}
      <mesh position={[0.35, 0.15, 0.46]}>
        <circleGeometry args={[0.02, 12]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#22c55e" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Computer Tower ── */
function Tower({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Main tower body */}
      <RoundedBox args={[0.35, 1.0, 0.7]} radius={0.03} smoothness={4} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={C.beige} roughness={0.6} metalness={0.05} />
      </RoundedBox>
      {/* Front panel line */}
      <mesh position={[0.176, 0.5, 0]}>
        <planeGeometry args={[0.003, 0.9]} />
        <meshStandardMaterial color={C.beigeDark} />
      </mesh>
      {/* Floppy drive slot */}
      <mesh position={[0.178, 0.75, 0]}>
        <boxGeometry args={[0.01, 0.04, 0.28]} />
        <meshStandardMaterial color={C.beigeDark} roughness={0.4} />
      </mesh>
      {/* CD drive slot */}
      <mesh position={[0.178, 0.6, 0]}>
        <boxGeometry args={[0.01, 0.06, 0.3]} />
        <meshStandardMaterial color={C.beigeDark} roughness={0.4} />
      </mesh>
      {/* Power button */}
      <mesh position={[0.178, 0.25, 0.15]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#555" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Power LED */}
      <mesh position={[0.178, 0.25, 0.05]}>
        <circleGeometry args={[0.012, 12]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#22c55e" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Keyboard ── */
function Keyboard({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Keyboard base */}
      <RoundedBox args={[1.0, 0.04, 0.35]} radius={0.01} smoothness={4} position={[0, 0.02, 0]}>
        <meshStandardMaterial color={C.keyboard} roughness={0.5} metalness={0.05} />
      </RoundedBox>
      {/* Key rows */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh key={`k-${row}-${col}`} position={[-0.42 + col * 0.072, 0.045, -0.11 + row * 0.07]}>
            <boxGeometry args={[0.055, 0.015, 0.05]} />
            <meshStandardMaterial color={C.beigeDark} roughness={0.5} />
          </mesh>
        ))
      )}
      {/* Space bar */}
      <mesh position={[0, 0.045, 0.14]}>
        <boxGeometry args={[0.35, 0.015, 0.05]} />
        <meshStandardMaterial color={C.beigeDark} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ── Mouse ── */
function Mouse({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.12, 0.04, 0.18]} radius={0.02} smoothness={4} position={[0, 0.02, 0]}>
        <meshStandardMaterial color={C.mouse} roughness={0.4} metalness={0.05} />
      </RoundedBox>
      {/* Mouse button divider */}
      <mesh position={[0, 0.041, -0.03]}>
        <boxGeometry args={[0.001, 0.005, 0.08]} />
        <meshStandardMaterial color={C.beigeDark} />
      </mesh>
      {/* Cable */}
      <mesh position={[0, 0.015, -0.1]}>
        <cylinderGeometry args={[0.006, 0.006, 0.15, 8]} />
        <meshStandardMaterial color="#555" roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ── Office Chair ── */
function OfficeChair({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Seat */}
      <RoundedBox args={[0.7, 0.08, 0.65]} radius={0.03} smoothness={4} position={[0, 0.65, 0]}>
        <meshStandardMaterial color={C.chairCush} roughness={0.8} metalness={0.0} />
      </RoundedBox>
      {/* Backrest */}
      <RoundedBox args={[0.65, 0.7, 0.06]} radius={0.03} smoothness={4} position={[0, 1.1, -0.3]}>
        <meshStandardMaterial color={C.chair} roughness={0.75} metalness={0.0} />
      </RoundedBox>
      {/* Backrest cushion */}
      <RoundedBox args={[0.55, 0.55, 0.04]} radius={0.02} smoothness={4} position={[0, 1.12, -0.27]}>
        <meshStandardMaterial color={C.chairCush} roughness={0.8} />
      </RoundedBox>
      {/* Armrests */}
      {[-0.32, 0.32].map((x, i) => (
        <group key={`arm-${i}`}>
          {/* Vertical support */}
          <mesh position={[x, 0.78, -0.05]}>
            <cylinderGeometry args={[0.02, 0.02, 0.22, 8]} />
            <meshStandardMaterial color={C.chair} roughness={0.3} metalness={0.4} />
          </mesh>
          {/* Armrest pad */}
          <RoundedBox args={[0.06, 0.03, 0.25]} radius={0.01} smoothness={4} position={[x, 0.9, 0]}>
            <meshStandardMaterial color={C.chairCush} roughness={0.7} />
          </RoundedBox>
        </group>
      ))}
      {/* Center post */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.55, 8]} />
        <meshStandardMaterial color="#333" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Star base — 5 legs */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        const x = Math.sin(angle) * 0.32;
        const z = Math.cos(angle) * 0.32;
        return (
          <group key={`leg-${i}`}>
            <mesh position={[x / 2, 0.06, z / 2]} rotation={[0, -angle, Math.PI / 2 - 0.15]}>
              <cylinderGeometry args={[0.018, 0.018, 0.35, 6]} />
              <meshStandardMaterial color="#333" roughness={0.3} metalness={0.6} />
            </mesh>
            {/* Wheel */}
            <mesh position={[x, 0.035, z]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color="#222" roughness={0.4} metalness={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ── Desk Items (notepad, pen, small frame) ── */
function DeskItems({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Notepad */}
      <mesh position={[-0.15, 0.015, 0.15]}>
        <boxGeometry args={[0.25, 0.02, 0.32]} />
        <meshStandardMaterial color={C.paper} roughness={0.9} />
      </mesh>
      {/* Pen */}
      <mesh position={[0.05, 0.025, 0.2]} rotation={[0, 0.3, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.2, 6]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Small photo frame */}
      <group position={[0.5, 0.12, -0.1]}>
        <mesh>
          <boxGeometry args={[0.15, 0.2, 0.02]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[0.11, 0.15]} />
          <meshStandardMaterial color="#3a3530" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Full Desk Scene ── */
function DeskScene() {
  return (
    <group>
      {/* ── Desk ── */}
      {/* Desktop surface */}
      <RoundedBox args={[3.0, 0.08, 1.2]} radius={0.02} smoothness={4} position={[0, 1.0, 0]}>
        <meshStandardMaterial color={C.deskWood} roughness={0.55} metalness={0.05} />
      </RoundedBox>
      {/* Front edge trim */}
      <mesh position={[0, 0.94, 0.6]}>
        <boxGeometry args={[3.0, 0.04, 0.02]} />
        <meshStandardMaterial color={C.deskEdge} roughness={0.5} />
      </mesh>

      {/* Desk legs — angled like the reference */}
      {[[-1.3, -0.45], [1.3, -0.45], [-1.3, 0.45], [1.3, 0.45]].map(([x, z], i) => (
        <mesh key={`dleg-${i}`} position={[x, 0.48, z]}>
          <boxGeometry args={[0.06, 0.96, 0.06]} />
          <meshStandardMaterial color={C.legs} roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
      {/* Cross bar */}
      <mesh position={[0, 0.15, -0.45]}>
        <boxGeometry args={[2.6, 0.04, 0.04]} />
        <meshStandardMaterial color={C.legs} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* ── Items on desk ── */}
      <Tower position={[-1.0, 1.04, -0.1]} />
      <CRTMonitor position={[0.0, 1.04, -0.15]} />
      <Keyboard position={[0.0, 1.04, 0.3]} />
      <Mouse position={[0.7, 1.04, 0.3]} />
      <DeskItems position={[-0.5, 1.04, 0.15]} />

      {/* ── Chair ── */}
      <OfficeChair position={[0, 0, 1.3]} />
    </group>
  );
}

/* ── Scene Controller (mouse interaction) ── */
function SceneController() {
  const { camera } = useThree();
  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 860;

  useEffect(() => {
    camera.lookAt(0, 0.8, 0);

    if (isMobile) return;

    const container = document.getElementById('contact-3d-container');
    if (!container) return;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      hoveringRef.current = true;
    };
    const onLeave = () => { hoveringRef.current = false; };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [camera, isMobile]);

  useFrame((_, delta) => {
    if (!groupRef.current || isMobile) return;

    const damping = 4;
    if (hoveringRef.current) {
      targetRef.current.x = mouseRef.current.x * 0.12;
      targetRef.current.y = mouseRef.current.y * 0.06;
    } else {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    }

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRef.current.x, damping, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetRef.current.y, damping, delta);
  });

  return (
    <group ref={groupRef} rotation={[0, -0.4, 0]}>
      <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.04}>
        <DeskScene />
        {/* Screen glow bounce light */}
        <pointLight position={[0, 1.8, 0.5]} intensity={0.4} color={C.screenGlow} distance={3} decay={2} />
      </Float>
    </group>
  );
}

/* ── Exported Canvas wrapper ── */
export default function ContactModel() {
  return (
    <Canvas
      camera={{ position: [4, 3.5, 5], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <color attach="background" args={['#0c0b09']} />
      <fog attach="fog" args={['#0c0b09', 6, 16]} />

      {/* Warm ambient matching portfolio palette */}
      <ambientLight intensity={0.3} color="#e8c88a" />

      {/* Key light — warm gold from above */}
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#ffd4a0" />

      {/* Fill — cool from behind for depth */}
      <directionalLight position={[-5, 4, -6]} intensity={0.15} color="#2a2d55" />

      {/* Warm rim for edge definition */}
      <pointLight position={[-3, 2, 3]} intensity={0.25} color="#c9a96e" distance={8} decay={2} />

      {/* Screen bounce */}
      <pointLight position={[0.5, 1.5, 1]} intensity={0.3} color="#c9a96e" distance={4} decay={2} />

      <Environment preset="night" environmentIntensity={0.1} />

      <React.Suspense fallback={null}>
        <SceneController />
        <ContactShadows position={[0, -0.05, 0]} opacity={0.4} scale={8} blur={2.5} far={4} color="#000000" />
      </React.Suspense>
    </Canvas>
  );
}
