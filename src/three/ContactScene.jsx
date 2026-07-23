import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ── Color palette (matches contact form dark/gold theme) ── */
const C = {
  deskWood: '#8b6914',   // warm wood
  deskEdge: '#6b4f10',   // darker wood trim
  legs: '#2a2a2a',   // dark metal legs
  beige: '#d4c5a0',   // retro computer beige
  beigeDark: '#b8a87c',   // darker beige for sides
  screen: '#0d1117',   // dark screen
  screenGlow: '#c9a96e',   // gold glow matching accent
  chair: '#1a1a1a',   // dark chair
  chairCush: '#1e1e2a',   // dark cushion
  keyboard: '#c8b88a',   // beige keyboard
  mouse: '#bfae85',   // beige mouse
  paper: '#e8dcc8',   // paper/notepad
};

/* ── CRT Monitor ── */
function CRTMonitor({ position = [0, 0, 0], formData = {}, isSubmitting = false, isSubmitted = false, isHoveringSend = false, inView = false }) {
  const screenMatRef = useRef();
  const bootTimeRef = useRef(-1);
  const subStartTimeRef = useRef(0);
  const prevIsSubmittingRef = useRef(false);
  const submitTimeRef = useRef(0);
  const prevIsSubmittedRef = useRef(false);
  const lastStateRef = useRef({
    phase: '',
    isSubmitted: false,
    isSubmitting: false,
    showCursor: false,
    progressVal: -1,
    subText: '',
    cycle: -1,
    formDataStr: '',
    bootStep: 0
  });

  // Create a high-res canvas element and a Three.js texture
  const [canvas, texture] = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 768;
    const t = new THREE.CanvasTexture(c);
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = true;
    t.anisotropy = 16; // Maximum crispness at angles
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    return [c, t];
  }, []);

  useFrame((state) => {
    if (!screenMatRef.current) return;
    const t = state.clock.getElapsedTime();

    // Reset submission start time when not submitting
    if (!isSubmitting) {
      subStartTimeRef.current = 0;
    } else if (isSubmitting && !prevIsSubmittingRef.current) {
      subStartTimeRef.current = t;
    }
    prevIsSubmittingRef.current = isSubmitting;

    if (isSubmitted && !prevIsSubmittedRef.current) {
      submitTimeRef.current = t;
    }
    prevIsSubmittedRef.current = isSubmitted;

    // 1. Calculate boot phases
    let phase = 'off';
    let elapsed = 0;
    if (inView) {
      if (bootTimeRef.current === -1) {
        bootTimeRef.current = t;
      }
      elapsed = t - bootTimeRef.current;
      if (elapsed < 0.15) phase = 'flash';
      else if (elapsed < 0.7) phase = 'static';
      else if (elapsed < 2.2) phase = 'booting';
      else phase = 'ready';
    }

    // 2. Redraw canvas context
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const hasInput = !!(formData.name || formData.email || formData.message || formData.company || formData.projectType);

      const blinkFreq = isHoveringSend ? 4 : 2;
      const showCursor = phase === 'ready' && !isSubmitted && !isSubmitting && !hasInput && (Math.floor(t * blinkFreq) % 2 === 0);

      let elapsedSub = 0;
      let progressVal = -1;
      let subText = '';
      if (isSubmitting) {
        elapsedSub = t - subStartTimeRef.current;
        progressVal = Math.min(10, Math.floor((elapsedSub / 2.8) * 10));
        if (elapsedSub >= 0.7 && elapsedSub < 1.4) {
          subText = 'Establishing connection...';
        } else if (elapsedSub >= 1.4 && elapsedSub < 2.1) {
          subText = 'Encrypting payload...';
        } else if (elapsedSub >= 2.1) {
          subText = 'Sending...';
        } else {
          subText = 'Initializing...';
        }
      }

      let cycle = -1;
      if (phase === 'ready' && !isSubmitted && !isSubmitting && hasInput) {
        let filledCount = 0;
        if (formData.name) filledCount++;
        if (formData.email) filledCount++;
        if (formData.message) filledCount++;
        const total = 10;
        const targetFilled = Math.round((filledCount / 3) * total);
        cycle = Math.floor(t * 5) % (total - targetFilled + 1 || 1);
      }

      let elapsedBoot = 0;
      let bootStep = 0;
      if (phase === 'booting') {
        elapsedBoot = elapsed - 0.7;
        if (elapsedBoot > 0.2) bootStep++;
        if (elapsedBoot > 0.5) bootStep++;
        if (elapsedBoot > 0.8) bootStep++;
        if (elapsedBoot > 1.1) bootStep++;
      }

      const formDataStr = JSON.stringify(formData);

      const stateChanged =
        phase !== lastStateRef.current.phase ||
        isSubmitted !== lastStateRef.current.isSubmitted ||
        isSubmitting !== lastStateRef.current.isSubmitting ||
        showCursor !== lastStateRef.current.showCursor ||
        progressVal !== lastStateRef.current.progressVal ||
        subText !== lastStateRef.current.subText ||
        cycle !== lastStateRef.current.cycle ||
        formDataStr !== lastStateRef.current.formDataStr ||
        bootStep !== lastStateRef.current.bootStep ||
        phase === 'static';

      if (stateChanged) {
        lastStateRef.current = {
          phase,
          isSubmitted,
          isSubmitting,
          showCursor,
          progressVal,
          subText,
          cycle,
          formDataStr,
          bootStep
        };

        ctx.fillStyle = '#080a0f'; // darker background for better contrast
        ctx.fillRect(0, 0, 1024, 768);

        if (phase === 'flash') {
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 380, 1024, 8);
        } else if (phase === 'static') {
          const imgData = ctx.createImageData(1024, 768);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            const val = Math.random() > 0.5 ? 255 : 0;
            d[i] = val * 0.8;
            d[i + 1] = val * 0.75;
            d[i + 2] = val * 0.55;
            d[i + 3] = 45; // slight opacity so background shows
          }
          ctx.putImageData(imgData, 0, 0);
        } else if (phase === 'booting') {
          ctx.fillStyle = '#ffd580'; // brighter amber gold
          ctx.font = 'bold 40px monospace';
          ctx.fillText('VS WORKSTATION v2.1', 60, 100);
          ctx.fillText('-----------------------------', 60, 160);
          ctx.font = '36px monospace';
          if (elapsedBoot > 0.2) ctx.fillText('SYSTEM INIT... OK', 60, 240);
          if (elapsedBoot > 0.5) ctx.fillText('RAM CHECK: 640KB OK', 60, 320);
          if (elapsedBoot > 0.8) ctx.fillText('ESTABLISHING LINK... OK', 60, 400);
          if (elapsedBoot > 1.1) ctx.fillText('SYSTEM READY.', 60, 480);
        } else if (phase === 'ready') {
          // Draw Scanlines
          ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
          for (let y = 0; y < 768; y += 6) {
            ctx.fillRect(0, y, 1024, 2);
          }

          ctx.font = 'bold 44px monospace';
          ctx.textBaseline = 'top';

          if (isSubmitted) {
            // Delivered Screen
            ctx.fillStyle = '#52ff9e'; // bright vivid green
            ctx.fillText('STATUS: DELIVERED ✓', 60, 100);

            ctx.fillStyle = '#ffd580';
            ctx.font = '40px monospace';
            ctx.fillText('=============================', 60, 170);
            ctx.fillText('Message delivered.', 60, 260);
            ctx.fillText('Connection secure.', 60, 350);
            ctx.fillText('See you soon!', 60, 440);
            ctx.fillText('-----------------------------', 60, 530);
            ctx.fillText("Thanks! I'll get back soon.", 60, 620);
          } else if (isSubmitting) {
            // Submitting sequences
            ctx.fillStyle = '#ffd580';

            let bar = '█'.repeat(progressVal) + '▒'.repeat(10 - progressVal);

            ctx.fillText('TRANSMITTING PAYLOAD...', 60, 100);
            ctx.font = '40px monospace';
            ctx.fillText('=============================', 60, 170);

            ctx.fillText(subText, 60, 280);
            ctx.font = '48px monospace';
            ctx.fillText(bar, 60, 380);
            ctx.font = '40px monospace';
            ctx.fillText(`${Math.round((progressVal / 10) * 100)}% COMPLETE`, 60, 480);
          } else {
            // Normal Idle or Typing
            if (!hasInput) {
              // Idle state
              ctx.fillStyle = '#ffd580';
              ctx.fillText('VS TERMINAL v2.1', 60, 100);
              ctx.fillStyle = 'rgba(255, 213, 128, 0.4)';
              ctx.fillText('=============================', 60, 170);

              ctx.fillStyle = '#ffd580';
              ctx.fillText('SYSTEM READY', 60, 260);
              ctx.fillText('Waiting for incoming', 60, 350);
              ctx.fillText('connection...', 60, 440);

              // Draw cursor
              if (showCursor) {
                ctx.fillRect(60, 530, 28, 44);
              }
            } else {
              // Typing state
              ctx.fillStyle = '#ffd580';
              ctx.fillText('INCOMING CONNECTION...', 60, 100);
              ctx.font = '36px monospace';
              ctx.fillText('RECEIVING DATA...', 60, 160);

              // Progress bar based on fields filled
              let filledCount = 0;
              if (formData.name) filledCount++;
              if (formData.email) filledCount++;
              if (formData.message) filledCount++;

              // Use the cycle background shading formula
              const total = 10;
              const targetFilled = Math.round((filledCount / 3) * total);
              let bar = '█'.repeat(targetFilled);
              for (let i = 0; i < total - targetFilled; i++) {
                bar += (i === cycle) ? '█' : '▒';
              }

              ctx.font = '44px monospace';
              ctx.fillText(bar, 60, 240);

              // Checklist verification
              ctx.font = '40px monospace';
              ctx.fillText('=============================', 60, 320);

              ctx.fillStyle = formData.name ? '#52ff9e' : 'rgba(255, 213, 128, 0.4)';
              ctx.fillText(formData.name ? 'Identity Verified ✓' : 'Authenticating User...', 60, 400);

              ctx.fillStyle = formData.email ? '#52ff9e' : 'rgba(255, 213, 128, 0.4)';
              ctx.fillText(formData.email ? 'Connection Established ✓' : 'Securing Connection...', 60, 490);

              ctx.fillStyle = formData.message ? '#52ff9e' : 'rgba(255, 213, 128, 0.4)';
              ctx.fillText(formData.message ? 'Secure Channel Open ✓' : 'Opening Payload Channel...', 60, 580);
            }
          }
        }
        texture.needsUpdate = true;
      }
    }

    // 3. Emissive intensity control (breathing + flicker + mouse distance)
    if (phase === 'off') {
      screenMatRef.current.emissiveIntensity = 0;
    } else {
      let baseIntensity = 0.65 + Math.sin(t * 2) * 0.08;

      // Tiny random flicker
      if (Math.random() > 0.985) {
        baseIntensity -= 0.2;
      } else if (Math.random() > 0.97) {
        baseIntensity += 0.06;
      }

      // Mouse distance proximity
      const dist = Math.sqrt(state.pointer.x * state.pointer.x + state.pointer.y * state.pointer.y);
      const proximityIntensity = Math.max(0, 1.0 - dist) * 0.12;

      // Send hover brightness lift
      const hoverIntensity = isHoveringSend ? 0.08 : 0;

      // Success screen pulse & dimming
      let pulseDim = 1.0;
      if (isSubmitted) {
        const elapsedSubmit = t - submitTimeRef.current;
        if (elapsedSubmit > 0 && elapsedSubmit < 0.5) {
          pulseDim = 1.6 - (elapsedSubmit / 0.5) * 0.8;
        } else {
          pulseDim = 0.75;
        }
      }

      screenMatRef.current.emissiveIntensity = (baseIntensity + proximityIntensity + hoverIntensity) * pulseDim;
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
          color="#000000"
          roughness={0.25}
          metalness={0.1}
          map={texture}
          emissive="#ffffff"
          emissiveMap={texture}
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
      {/* CD CD drive slot */}
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
      {/* Key Key rows */}
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
function OfficeChair({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
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
          {/* Armrest armrest pad */}
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
      {/* Star star base — 5 legs */}
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
function DeskScene({ formData, isSubmitting, isSubmitted, isHoveringSend, inView }) {
  return (
    <group>
      {/* ── Desk ── */}
      {/* Desktop surface */}
      <RoundedBox args={[3.0, 0.08, 1.2]} radius={0.02} smoothness={4} position={[0, 1.0, 0]}>
        <meshStandardMaterial color={C.deskWood} roughness={0.55} metalness={0.05} />
      </RoundedBox>
      {/* Front edge edge trim */}
      <mesh position={[0, 0.94, 0.6]}>
        <boxGeometry args={[3.0, 0.04, 0.02]} />
        <meshStandardMaterial color={C.deskEdge} roughness={0.5} />
      </mesh>

      {/* Desk legs — angled */}
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
      <Tower position={[-1.0, 1.04, -0.2]} />
      <CRTMonitor
        position={[0.0, 1.04, -0.25]}
        formData={formData}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        isHoveringSend={isHoveringSend}
        inView={inView}
      />
      <Keyboard position={[0.0, 1.04, 0.41]} />
      <Mouse position={[0.7, 1.04, 0.41]} />
      <DeskItems position={[-0.5, 1.04, 0.15]} />

      {/* ── Chair ── */}
      <OfficeChair position={[0, 0, 1.25]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

/* ── Scene Controller (mouse interaction) ── */
function SceneController({ formData, isSubmitting, isSubmitted, isHoveringSend, inView }) {
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

  useFrame((state, delta) => {
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
        <DeskScene
          formData={formData}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
          isHoveringSend={isHoveringSend}
          inView={inView}
        />
        {/* Screen glow bounce light */}
        <pointLight position={[0, 1.8, 0.5]} intensity={0.4} color={C.screenGlow} distance={3} decay={2} />
      </Float>
    </group>
  );
}

/* ── Exported Canvas wrapper ── */
export default function ContactModel({ formData, isSubmitting, isSubmitted, isHoveringSend, inView }) {
  return (
    <Canvas
      camera={{ position: [3.1, 2.7, 4.0], fov: 31 }}
      dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]}
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
        <SceneController
          formData={formData}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
          isHoveringSend={isHoveringSend}
          inView={inView}
        />
        <ContactShadows position={[0, -0.05, 0]} opacity={0.4} scale={8} blur={2.5} far={4} color="#000000" />
      </React.Suspense>
    </Canvas>
  );
}
