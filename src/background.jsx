// Interactive background — mouse-reactive gradient orbs + floating particle network
const { motion, useMotionValue, useSpring, useTransform } = window.framerMotion || window.Motion || window.FramerMotion;

function InteractiveBackground() {
  const canvasRef = React.useRef(null);
  const mouseRef = React.useRef({ x: 0.5, y: 0.3 });
  const rafRef = React.useRef(0);

  // Smooth motion values for orbs
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.8 });

  const orb1X = useTransform(sx, v => `${v * 40 + 10}%`);
  const orb1Y = useTransform(sy, v => `${v * 40 + 5}%`);
  const orb2X = useTransform(sx, v => `${(1 - v) * 40 + 40}%`);
  const orb2Y = useTransform(sy, v => `${(1 - v) * 30 + 20}%`);
  const orb3X = useTransform(sx, v => `${v * 30 + 30}%`);
  const orb3Y = useTransform(sy, v => `${v * 50 + 30}%`);

  React.useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseRef.current = { x, y };
      mx.set(x);
      my.set(y);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  // Particle canvas — floating nodes with connective lines that react to cursor
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(56, Math.floor((window.innerWidth * window.innerHeight) / 28000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.6 + 0.6,
    }));

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const mouse = { x: mouseRef.current.x * w, y: mouseRef.current.y * h };

      // Update + draw dots
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 180) {
          const f = (180 - dm) / 180;
          p.x += (dxm / dm) * f * 0.6;
          p.y += (dym / dm) * f * 0.6;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(8,145,166,0.5)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connect lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.25;
            ctx.strokeStyle = `rgba(8,145,166,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // connect to mouse
        const dxm = particles[i].x - mouse.x;
        const dym = particles[i].y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 160) {
          const alpha = (1 - dm / 160) * 0.6;
          ctx.strokeStyle = `rgba(94,234,212,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient wash — sky to sand to seafoam */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #fef8ed 0%, #fff5e8 25%, #f5f0e3 55%, #e8f4f2 100%)',
        }}
      />
      {/* Wave horizon band */}
      <div
        className="absolute inset-x-0"
        style={{
          top: '55%',
          height: '45%',
          background:
            'linear-gradient(180deg, rgba(94,234,212,0) 0%, rgba(94,234,212,0.08) 40%, rgba(8,145,166,0.12) 100%)',
        }}
      />
      {/* Mouse-reactive gradient orbs */}
      <motion.div
        key="orb-1"
        className="absolute w-[60vw] h-[60vw] rounded-full blur-3xl opacity-60"
        style={{
          left: orb1X,
          top: orb1Y,
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgba(8,145,166,0.38) 0%, rgba(8,145,166,0) 60%)',
        }}
      />
      <motion.div
        key="orb-2"
        className="absolute w-[48vw] h-[48vw] rounded-full blur-3xl opacity-50"
        style={{
          left: orb2X,
          top: orb2Y,
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgba(255,138,101,0.4) 0%, rgba(255,138,101,0) 60%)',
        }}
      />
      <motion.div
        key="orb-3"
        className="absolute w-[50vw] h-[50vw] rounded-full blur-3xl opacity-50"
        style={{
          left: orb3X,
          top: orb3Y,
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgba(94,234,212,0.55) 0%, rgba(94,234,212,0) 60%)',
        }}
      />
      {/* Particle network */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Noise overlay */}
      <div className="absolute inset-0 noise opacity-[0.22] mix-blend-overlay" />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(254,248,237,0.55) 100%)' }} />
    </div>
  );
}

window.InteractiveBackground = InteractiveBackground;
