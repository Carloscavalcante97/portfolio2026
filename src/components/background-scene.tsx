"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Contained nebula: one cool tone, low opacity, gas kept toward the edges so the
// reading column stays clean. No pointer reaction, no intro, no per-section color.
const PALETTE = {
  dark: { base: "#141b2a", accent: "#33415c", opacity: 0.45 },
  light: { base: "#dbe2ec", accent: "#a9b6c8", opacity: 0.35 },
} as const;

// The gas drifts very slowly, so ~20 fps is indistinguishable from 60 and
// saves battery. Rendering stops entirely while the tab is hidden.
const FRAME_INTERVAL_MS = 50;

const NEBULA_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const NEBULA_FRAGMENT = `
  uniform float uTime;
  uniform float uScroll;
  uniform float uAspect;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.03 + 11.7;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= uAspect;

    // Very slow drift with scroll
    p.y += uScroll * 0.6;

    float t = uTime * 0.02;
    vec2 q = vec2(fbm(p * 1.2 + t), fbm(p * 1.2 - t * 0.7 + 3.1));
    float n = fbm(p * 1.4 + q * 1.6 + t * 0.5);

    float density = smoothstep(0.35, 0.85, n);
    // Keep the center column (where the text lives) nearly clear
    float edge = smoothstep(0.12, 0.5, abs(vUv.x - 0.5));
    density *= mix(0.25, 1.0, edge);

    vec3 col = mix(uColorB, uColorA, density);
    gl_FragColor = vec4(col, density * uOpacity);
  }
`;

type Tone = (typeof PALETTE)[keyof typeof PALETTE];

function Nebula({ scrollRef, tone }: { scrollRef: React.RefObject<number>; tone: Tone }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uAspect: { value: 1 },
      uColorA: { value: new THREE.Color(tone.accent) },
      uColorB: { value: new THREE.Color(tone.base) },
      uOpacity: { value: tone.opacity },
    }),
    // Theme changes are applied in useFrame; uniforms are created once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = clock.getElapsedTime();
    u.uScroll.value = scrollRef.current ?? 0;
    u.uAspect.value = viewport.width / viewport.height;
    u.uColorA.value.set(tone.accent);
    u.uColorB.value.set(tone.base);
    u.uOpacity.value = tone.opacity;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={NEBULA_VERTEX}
        fragmentShader={NEBULA_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function Scene({ tone }: { tone: Tone }) {
  const scrollRef = useRef(0);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const id = window.setInterval(() => {
      if (!document.hidden) invalidate();
    }, FRAME_INTERVAL_MS);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(id);
    };
  }, [invalidate]);

  return <Nebula scrollRef={scrollRef} tone={tone} />;
}

export function BackgroundScene(): React.JSX.Element {
  const { resolvedTheme } = useTheme();
  const tone = resolvedTheme === "light" ? PALETTE.light : PALETTE.dark;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <Scene tone={tone} />
    </Canvas>
  );
}
