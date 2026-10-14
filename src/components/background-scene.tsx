"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Color journey: one stop per section (hero → sobre → projetos → pipeline → experiência → stack → contato).
// Scroll progress lerps smoothly between adjacent stops — the nebula gas is tinted by it.
const COLOR_STOPS = [
  "#512BD4", // hero — roxo .NET
  "#7c3aed", // sobre — roxo mais claro
  "#f89820", // projetos — laranja Java
  "#10b981", // pipeline — verde esmeralda
  "#2563eb", // experiência — azul
  "#512BD4", // stack — de volta ao roxo
  "#10b981", // contato — verde CTA
].map((c) => new THREE.Color(c));

const NEBULA_BASE = new THREE.Color("#1b2145"); // deep indigo gas body

// ---------------------------------------------------------------------------
// Nebula — fullscreen quad, domain-warped FBM. The mouse swirls the gas
// locally (exponential falloff) and the uniform is lerped, so the fluid
// trails behind the cursor instead of snapping.
// ---------------------------------------------------------------------------
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
  uniform float uIntro; // 0 = dentro da nebulosa (abertura), 1 = estado normal
  uniform vec2 uMouse;
  uniform vec3 uColorA; // scroll-driven accent
  uniform vec3 uColorB; // deep base
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
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uAspect;
    vec2 m = uMouse;
    m.x *= uAspect;

    // Mouse repels the gas: it splits and spreads to both sides, the split
    // direction wandering over time so the scatter never looks mirrored
    vec2 d = uv - m;
    float r = length(d);
    vec2 dir = d / (r + 1e-4);
    vec2 perp = vec2(-dir.y, dir.x);
    float infl = exp(-r * r * 1.6);
    float side = noise(uv * 3.0 + uTime * 0.15) * 2.0 - 1.0;
    vec2 p = uv - (dir + perp * side * 1.4) * infl * 0.55;

    // Nebula slowly flows past as the visitor scrolls
    p.y += uScroll * 1.5;

    // Intro fly-through: starts zoomed inside the gas, pulls back to normal
    p *= mix(0.3, 1.0, uIntro);
    p.y -= (1.0 - uIntro) * 1.2;

    float t = uTime * 0.04;
    vec2 q = vec2(fbm(p * 1.2 + t), fbm(p * 1.2 - t * 0.7 + 3.1));
    float n = fbm(p * 1.4 + q * 1.6 + t * 0.5);

    // Denser during the intro, relaxing into the subtle resting state
    float density = smoothstep(mix(0.12, 0.35, uIntro), 0.85, n);
    // The repelled zone thins out around the cursor
    density *= 1.0 - infl * 0.7;
    vec3 col = mix(uColorB, uColorA, density);
    col += uColorA * pow(density, 3.0) * 0.35; // brighter wisp cores

    gl_FragColor = vec4(col, density * uOpacity);
  }
`;

// ---------------------------------------------------------------------------
// Stars — sparse, faint, neutral; the nebula carries the color now.
// ---------------------------------------------------------------------------
// ponytail: pseudo-noise via sines — swap for simplex if visible pattern emerges
const STAR_VERTEX = `
  attribute float aSeed;
  uniform float uTime;
  uniform float uSize;
  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.5 + aSeed * 6.2831) * 0.5;
    pos.x += cos(uTime * 0.35 + aSeed * 12.566) * 0.3;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const STAR_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.32, d);
    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`;

type SharedRefs = {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
  opacityTarget: number;
};

function Nebula({ mouseRef, scrollRef, opacityTarget }: SharedRefs) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const targetColor = useRef(new THREE.Color());
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:    { value: 0 },
      uScroll:  { value: 0 },
      uAspect:  { value: 1 },
      uIntro:   { value: 0 },
      uMouse:   { value: new THREE.Vector2(0, 0) },
      uColorA:  { value: COLOR_STOPS[0].clone() },
      uColorB:  { value: NEBULA_BASE.clone() },
      uOpacity: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    const elapsed = clock.getElapsedTime();
    u.uTime.value = elapsed;
    u.uScroll.value = scrollRef.current;
    u.uAspect.value = viewport.width / viewport.height;

    // Intro fly-through over the first ~2.8s (smoothstep ease)
    const it = Math.min(elapsed / 2.8, 1);
    const intro = it * it * (3 - 2 * it);
    u.uIntro.value = intro;

    // Fluid trail: the swirl center eases toward the pointer
    u.uMouse.value.lerp(
      new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
      0.08,
    );
    // Full-strength gas during the intro, settling to the subtle resting cap
    u.uOpacity.value = THREE.MathUtils.lerp(
      u.uOpacity.value,
      opacityTarget * (0.4 + (1 - intro) * 0.6),
      intro < 1 ? 0.12 : 0.05,
    );

    // Color journey — blend between the two stops around current progress
    const seg = scrollRef.current * (COLOR_STOPS.length - 1);
    const i = Math.min(Math.floor(seg), COLOR_STOPS.length - 2);
    targetColor.current.lerpColors(COLOR_STOPS[i], COLOR_STOPS[i + 1], seg - i);
    u.uColorA.value.lerp(targetColor.current, 0.06);
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

function Stars({ mouseRef, scrollRef, opacityTarget }: SharedRefs) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const count = 900;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3; // ±1.5
      seed[i] = Math.random();
    }
    return { positions: pos, seeds: seed };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime:    { value: 0 },
      uColor:   { value: new THREE.Color("#aeb9d8") },
      uOpacity: { value: 0 },
      uSize:    { value: 30 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (!matRef.current || !groupRef.current) return;
    const elapsed = clock.getElapsedTime();
    matRef.current.uniforms.uTime.value = elapsed;
    // Stars only emerge once the intro fly-through clears (~2s)
    matRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uOpacity.value,
      elapsed > 2 ? opacityTarget * 0.6 : 0,
      0.05,
    );

    // Mouse parallax — lerp toward target
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.22,
      0.05,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.12,
      0.05,
    );

    // Slow upward drift as the visitor descends the page
    groupRef.current.position.y = scrollRef.current * 2;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aSeed"
            args={[seeds, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          vertexShader={STAR_VERTEX}
          fragmentShader={STAR_FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function Scene({ opacityTarget }: { opacityTarget: number }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    }
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    }
    onScroll();
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Nebula mouseRef={mouseRef} scrollRef={scrollRef} opacityTarget={opacityTarget} />
      <Stars mouseRef={mouseRef} scrollRef={scrollRef} opacityTarget={opacityTarget} />
    </>
  );
}

export function BackgroundScene(): React.JSX.Element {
  const { resolvedTheme } = useTheme();
  const opacityTarget = resolvedTheme === "light" ? 0.55 : 0.9;

  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <Scene opacityTarget={opacityTarget} />
    </Canvas>
  );
}
