'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(99, 102, 241, 0.12)',
      'rgba(59, 130, 246, 0.12)',
      'rgba(168, 85, 247, 0.10)',
    ];

    // Reduced from 30 → 8 particles, no JS animation — pure CSS keyframes
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Inject keyframe animation once */}
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.4; }
          33%       { transform: translateY(-60px) translateX(20px) scale(1.1); opacity: 0.6; }
          66%       { transform: translateY(-30px) translateX(-15px) scale(0.95); opacity: 0.5; }
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              filter: 'blur(40px)',
              willChange: 'transform, opacity',
              animation: `floatUp ${p.duration}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
