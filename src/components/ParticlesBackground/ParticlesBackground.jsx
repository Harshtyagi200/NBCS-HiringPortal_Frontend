import Particles from "react-tsparticles";
import { useEffect } from "react";

export default function ParticlesBackground() {
  // NOTE: Removed loadFull/init to avoid engine/version mismatch errors.
  // React-tsparticles will render with the bundled engine. If you need
  // additional plugins later we can align package versions and call loadFull.
  useEffect(() => {
    if (typeof window !== 'undefined') console.debug('ParticlesBackground mounted');
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5, pointerEvents: 'none' }}>
      {/* Decorative soft circles to give a hiring-portal look (behind content) */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <div className="bg-circle circle-1" />
        <div className="bg-circle circle-2" />
        <div className="bg-circle circle-3" />
      </div>

      <style>{`\
        .bg-circle {\
          position: absolute;\
          border-radius: 50%;\
          filter: blur(60px);\
          opacity: 0.85;\
          transform: translate3d(0,0,0);\
          pointer-events: none;\
        }\
        .circle-1 { width: 520px; height: 520px; left: -120px; top: -80px; background: radial-gradient(circle at 30% 30%, rgba(255,102,51,0.95), rgba(255,102,51,0.25)); animation: float1 10s ease-in-out infinite; }\
        .circle-2 { width: 420px; height: 420px; right: -80px; top: 60px; background: radial-gradient(circle at 70% 30%, rgba(58,123,213,0.95), rgba(58,123,213,0.18)); animation: float2 12s ease-in-out infinite; }\
        .circle-3 { width: 360px; height: 360px; left: 20%; bottom: -140px; background: radial-gradient(circle at 40% 60%, rgba(165,84,255,0.95), rgba(165,84,255,0.16)); animation: float3 14s ease-in-out infinite; }\
        @keyframes float1 { 0% { transform: translateY(0px); } 50% { transform: translateY(18px); } 100% { transform: translateY(0px); } }\
        @keyframes float2 { 0% { transform: translateY(0px); } 50% { transform: translateY(-22px); } 100% { transform: translateY(0px); } }\
        @keyframes float3 { 0% { transform: translateY(0px); } 50% { transform: translateY(26px); } 100% { transform: translateY(0px); } }\
      `}</style>

      {/* Particles: circular, mixed colors, gentle attract for group-like motion */}
      <Particles
        options={{
          fullScreen: { enable: false },
          background: { color: { value: 'transparent' } },
          interactivity: {
            detectsOn: 'canvas',
            events: { onHover: { enable: true, mode: 'grab' }, onClick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 160, links: { opacity: 0.5 } }, push: { quantity: 3 } }
          },
          particles: {
            number: { value: 90, density: { enable: true, area: 800 } },
            color: { value: ['#FF6600', '#3A7BD5', '#A554FF', '#FFD166'] },
            shape: { type: 'circle' },
            opacity: { value: 0.85, random: { enable: true, minimumValue: 0.4 } },
            size: { value: { min: 2, max: 9 }, random: true },
            links: { enable: false },
            move: { enable: true, speed: 0.9, direction: 'none', random: false, straight: false, outModes: { default: 'out' }, attract: { enable: true, rotateX: 600, rotateY: 1200 } }
          },
          detectRetina: true
        }}
        style={{ width: '100%', height: '100%', display: 'block', zIndex: 4, pointerEvents: 'none' }}
      />
    </div>
  );
}
