
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Performance optimization: render at lower resolution on mobile
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(width * pixelRatio, height * pixelRatio) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);
          return mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.xy;
          vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y * 5.0;
          
          vec4 o = vec4(0.0);
          float t = iTime * 0.2;

          // Layer 1: Aurore / Flussi energetici (Ottimizzato a 8 iterazioni)
          for (float i = 0.0; i < 8.0; i++) {
            vec2 v = p + cos(i + t + p.x * 0.2 + i * vec2(1.5, 1.2)) * 2.0;
            
            vec4 auroraColor = vec4(
              0.1 + 0.2 * sin(i * 0.5 + t),
              0.2 + 0.4 * cos(i * 0.8 + t),
              0.5 + 0.4 * sin(i * 0.3 + t),
              1.0
            );
            
            float intensity = 0.01 / length(v * vec2(1.0, 2.0));
            o += auroraColor * intensity * (i / 8.0);
          }

          o = tanh(o * 2.0);
          gl_FragColor = vec4(o.rgb, o.a * 0.4);
        }
      `,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      material.uniforms.iTime.value += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.iResolution.value.set(w * pixelRatio, h * pixelRatio);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950 pointer-events-none" />
    </div>
  );
};

export default AnimatedShaderBackground;
