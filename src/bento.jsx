const { motion: bentoMotion, AnimatePresence: BentoAP, LayoutGroup: BentoLG } = window.framerMotion || window.Motion || window.FramerMotion;

// Chart modes — each mode has its own layout/shape
const CHART_MODES = ['bars', 'area', 'radial', 'stacked'];

function generateData(mode) {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 85) + 15);
}

function BarsChart({ data }) {
  const colors = ['#ffb8a3', '#ffe4cc', '#0891a6', '#c8e7e3', '#5eead4', '#ffd4c4', '#d5e6e3'];
  return (
      <div className="flex items-end gap-2 h-48 w-full">
      {data.map((v, i) => (
        <bentoMotion.div
          key={i}
          layoutId={`chart-seg-${i}`}
          initial={{ height: 0 }}
          animate={{ height: `${v}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.04 }}
          className="flex-1 rounded-t-lg relative overflow-hidden"
          style={{ background: colors[i % colors.length] }}
        >
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent" />
        </bentoMotion.div>
      ))}
      </div>
  );
}

function AreaChart({ data }) {
  const max = 100;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - v;
    return [x, y];
  });
  const pathD = points.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = points[i - 1];
    const cx1 = (px + x) / 2;
    return `${acc} C ${cx1} ${py}, ${cx1} ${y}, ${x} ${y}`;
  }, '');
  const fillD = `${pathD} L 100 100 L 0 100 Z`;
  const colors = ['#ffb8a3', '#ffe4cc', '#0891a6', '#c8e7e3', '#5eead4', '#ffd4c4', '#d5e6e3'];
  return (
    <div className="h-48 w-full relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0891a6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <bentoMotion.path
          d={fillD}
          fill="url(#area-grad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <bentoMotion.path
          d={pathD}
          stroke="#0891a6"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map(([x, y], i) => (
          <bentoMotion.circle
            key={i}
            layoutId={`chart-seg-${i}`}
            cx={x}
            cy={y}
            r="1.4"
            fill={colors[i % colors.length]}
            stroke="white"
            strokeWidth="0.6"
          />
        ))}
      </svg>
    </div>
  );
}

function RadialChart({ data }) {
  const colors = ['#ffb8a3', '#ffe4cc', '#0891a6', '#c8e7e3', '#5eead4', '#ffd4c4', '#d5e6e3'];
  const max = Math.max(...data);
  return (
    <div className="h-48 w-full flex items-center justify-center">
      <div className="relative w-44 h-44">
        {data.map((v, i) => {
          const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2;
          const len = (v / max) * 72;
          const x = 50 + Math.cos(angle) * len;
          const y = 50 + Math.sin(angle) * len;
          return (
            <bentoMotion.div
              key={i}
              layoutId={`chart-seg-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: 18,
                height: 18,
                background: colors[i % colors.length],
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 4px 12px ${colors[i % colors.length]}80`,
              }}
            />
          );
        })}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-deep-ocean text-foam text-[10px] font-black flex items-center justify-center font-mono">
            SMK
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedChart({ data }) {
  const colors = ['#ffb8a3', '#ffe4cc', '#0891a6', '#c8e7e3', '#5eead4', '#ffd4c4', '#d5e6e3'];
  const total = data.reduce((a, b) => a + b, 0);
  return (
    <div className="h-48 w-full flex flex-col justify-center gap-3">
      <div className="flex w-full h-8 rounded-full overflow-hidden shadow-inner">
        {data.map((v, i) => (
          <bentoMotion.div
            key={i}
            layoutId={`chart-seg-${i}`}
            initial={{ width: 0 }}
            animate={{ width: `${(v / total) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            style={{ background: colors[i % colors.length] }}
            className="h-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          </bentoMotion.div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
        {data.slice(0, 4).map((v, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm" style={{ background: colors[i] }} />
            <span className="text-driftwood">{Math.round((v / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Bento() {
  const [modeIdx, setModeIdx] = React.useState(0);
  const [data, setData] = React.useState(generateData('bars'));
  const [loadLevel, setLoadLevel] = React.useState('IDLE');

  const mutate = () => {
    setLoadLevel('UPDATING');
    setData(generateData(CHART_MODES[modeIdx]));
    setTimeout(() => {
      setModeIdx(i => (i + 1) % CHART_MODES.length);
      setLoadLevel('REAL-TIME');
    }, 350);
    setTimeout(() => setLoadLevel('IDLE'), 2000);
  };

  const mode = CHART_MODES[modeIdx];
  const ChartComp = { bars: BarsChart, area: AreaChart, radial: RadialChart, stacked: StackedChart }[mode];

  return (
    <section id="uiux" className="relative py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <bentoMotion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral/15 border border-coral/25 text-[11px] font-bold tracking-widest uppercase text-coral mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            UI/UX Showcase
          </div>
          <h2 className="text-[40px] md:text-[64px] font-black hero-letter-spacing leading-[1.02] text-deep-ocean">
            State management<br />
            <span className="text-driftwood/70">that feels alive.</span>
          </h2>
        </bentoMotion.div>

        <BentoLG>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* LEFT: interactive states control */}
          <bentoMotion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5 relative rounded-[28px] p-8 text-sand flex flex-col justify-between overflow-hidden"
            style={{
              background: 'linear-gradient(155deg, #0a2540 0%, #05162b 100%)',
              boxShadow: 'inset 0 1px 0 rgba(94,234,212,0.12), inset 0 -1px 0 rgba(0,0,0,0.4), 0 24px 60px -20px rgba(10,37,64,0.4)',
            }}
          >
            {/* decorative glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-foam/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-coral/15 blur-3xl" />

            <div className="relative flex justify-between items-start mb-10">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-tide to-foam flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_24px_-8px_rgba(94,234,212,0.6)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a2540" strokeWidth="2.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <span className="inline-flex items-center gap-1.5 text-foam font-mono font-bold text-[10px] tracking-widest border border-foam/30 bg-foam/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-foam" />
                MOUNTED
              </span>
            </div>

            <div className="relative">
              <div className="text-[11px] font-mono uppercase tracking-widest text-foam/50 mb-2">Component State</div>
              <h4 className="text-[28px] font-black mb-3 leading-tight">Interactive<br />States</h4>
              <p className="text-sand/70 text-[14px] mb-6 leading-relaxed">
                Teste o data binding. O estado propaga via <span className="font-mono text-foam">layoutId</span> morph para o componente adjacente instantaneamente.
              </p>

              <bentoMotion.button
                onClick={mutate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="w-full group relative overflow-hidden bg-sand text-deep-ocean font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)]"
              >
                <bentoMotion.span
                  animate={loadLevel !== 'IDLE' ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                    <path d="M16 21v-5h5"/>
                  </svg>
                </bentoMotion.span>
                Mutate → {mode}
                <span className="absolute inset-0 bg-gradient-to-r from-tide/0 via-foam/20 to-tide/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </bentoMotion.button>

              {/* Mode chips */}
              <div className="flex gap-1.5 mt-4">
                {CHART_MODES.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => { setModeIdx(i); setData(generateData(m)); }}
                    className={`flex-1 text-[10px] font-mono uppercase tracking-wider py-1.5 rounded-md transition-all ${
                      i === modeIdx ? 'bg-tide text-sand' : 'bg-white/5 text-sand/50 hover:bg-white/10'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </bentoMotion.div>

          {/* RIGHT: morphing chart */}
          <bentoMotion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-7 relative glass rounded-[28px] p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-driftwood/70">System Load Metrics</div>
                <h5 className="font-black text-[22px] text-deep-ocean mt-1">Live telemetry</h5>
              </div>
              <BentoAP mode="wait">
                <bentoMotion.span
                  key={loadLevel}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-full ${
                    loadLevel === 'UPDATING' ? 'bg-coral text-sand' :
                    loadLevel === 'REAL-TIME' ? 'bg-foam/20 text-tide-pressed border border-foam/40' :
                    'bg-horizon/50 text-driftwood'
                  }`}
                >
                  {loadLevel === 'UPDATING' && <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{loadLevel}</span>}
                  {loadLevel !== 'UPDATING' && loadLevel}
                </bentoMotion.span>
              </BentoAP>
            </div>

            <div className="flex-1 flex items-center">
              <BentoAP mode="wait">
                <bentoMotion.div
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <ChartComp data={data} />
                </bentoMotion.div>
              </BentoAP>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-horizon/60">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-driftwood/70">Mode</div>
                <div className="font-black text-deep-ocean mt-0.5">{mode}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-driftwood/70">Avg</div>
                <div className="font-black text-deep-ocean mt-0.5 tabular-nums">
                  {Math.round(data.reduce((a, b) => a + b, 0) / data.length)}%
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-driftwood/70">Peak</div>
                <div className="font-black text-tide mt-0.5 tabular-nums">
                  {Math.max(...data)}%
                </div>
              </div>
            </div>
          </bentoMotion.div>

          {/* Bottom row — 3 glass cards */}
          {[
            {
              title: 'Spring Physics',
              kicker: 'Interaction',
              body: 'Cada tap propaga através de springs reais — stiffness 400, damping 17.',
              tint: 'seaglass',
              accent: '#0891a6',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              ),
            },
            {
              title: 'Layout Morph',
              kicker: 'Framer Motion',
              body: 'layoutId compartilhado — o mesmo segmento vira barra, ponto, arco ou faixa.',
              tint: 'shell',
              accent: '#ff8a65',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ),
            },
            {
              title: 'Edge Orchestration',
              kicker: 'Infra',
              body: 'Sentinel nodes em 12 regiões. Failover sub-50ms, observability nativa.',
              tint: 'foam',
              accent: '#0a7490',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              ),
            },
          ].map((card, i) => (            <bentoMotion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="md:col-span-4 relative glass rounded-[24px] p-6 overflow-hidden group cursor-pointer"
            >
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"
                style={{ background: `var(--tw-gradient-from, ${card.accent}20)`, backgroundColor: `${card.accent}20` }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.accent}15`, color: card.accent }}
                  >
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-driftwood/70">{card.kicker}</span>
                </div>
                <h4 className="font-black text-[18px] text-deep-ocean mb-1.5">{card.title}</h4>
                <p className="text-[13px] text-driftwood leading-relaxed">{card.body}</p>
                <div className="mt-5 pt-4 border-t border-horizon/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-driftwood/70">explore →</span>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-deep-ocean text-foam group-hover:bg-tide transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M7 7h10v10"/></svg>
                  </span>
                </div>
              </div>
            </bentoMotion.div>
          ))}
        </div>
        </BentoLG>
      </div>
    </section>
  );
}

window.Bento = Bento;
