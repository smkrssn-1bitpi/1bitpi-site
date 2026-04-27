const { motion: heroMotion, useMotionValue: heroUseMV, useSpring: heroUseSpring, useTransform: heroUseTransform, AnimatePresence: HeroAP } = window.framerMotion || window.Motion || window.FramerMotion;

// Syntax-highlighted terminal line tokens
function SyntaxLine({ tokens }) {
  const colors = {
    sys: 'text-driftwood',
    prompt: 'text-foam',
    kw: 'text-coral',            // keyword — sunset coral
    str: 'text-foam',            // string — foam mint
    fn: 'text-[#7dd3fc]',        // function — sky blue
    var: 'text-sand',
    comment: 'text-driftwood/70 italic',
    ok: 'text-foam font-semibold',
    num: 'text-coral',
    punct: 'text-driftwood/80',
  };
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-0.5">
      {tokens.map((t, i) => (
        <span key={i} className={colors[t.k] || 'text-zinc-700'}>{t.v}</span>
      ))}
    </div>
  );
}

const TERMINAL_SCRIPT = [
  [
    { k: 'prompt', v: '~' }, { k: 'sys', v: '$' },
    { k: 'fn', v: 'init' }, { k: 'punct', v: '(' },
    { k: 'str', v: "'pitter_core'" }, { k: 'punct', v: ')' },
  ],
  [
    { k: 'sys', v: '›' },
    { k: 'comment', v: '// bootstrapping autonomous core...' },
  ],
  [
    { k: 'prompt', v: '~' }, { k: 'kw', v: 'await' },
    { k: 'fn', v: 'connect' }, { k: 'punct', v: '(' },
    { k: 'var', v: 'LLM' }, { k: 'punct', v: '.' },
    { k: 'fn', v: 'orchestrator' }, { k: 'punct', v: ')' },
    { k: 'ok', v: '  ✓' },
  ],
  [
    { k: 'prompt', v: '~' }, { k: 'fn', v: 'boot' },
    { k: 'punct', v: '(' }, { k: 'str', v: "'sentinel.edge'" },
    { k: 'punct', v: ',' }, { k: 'num', v: '4' }, { k: 'punct', v: ')' },
    { k: 'ok', v: '  ✓' },
  ],
  [
    { k: 'sys', v: '›' },
    { k: 'comment', v: '// microbial energy → calibrated' },
  ],
  [
    { k: 'prompt', v: '~' }, { k: 'kw', v: 'compile' },
    { k: 'var', v: ' ui.assets' },
    { k: 'punct', v: ' →' },
    { k: 'str', v: "'MCP'" },
    { k: 'ok', v: '  ✓' },
  ],
  [
    { k: 'sys', v: '›' },
    { k: 'ok', v: 'System Ready. Awaiting user command._' },
  ],
];

function Terminal3D() {
  const ref = React.useRef(null);
  const mx = heroUseMV(0);
  const my = heroUseMV(0);
  const sx = heroUseSpring(mx, { stiffness: 180, damping: 22 });
  const sy = heroUseSpring(my, { stiffness: 180, damping: 22 });
  const rotY = heroUseTransform(sx, [-0.5, 0.5], [8, -8]);
  const rotX = heroUseTransform(sy, [-0.5, 0.5], [-6, 6]);
  const glareX = heroUseTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const glareY = heroUseTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const [lines, setLines] = React.useState([]);
  const [tokens, setTokens] = React.useState([]);
  const [lineIdx, setLineIdx] = React.useState(0);
  const [tokIdx, setTokIdx] = React.useState(0);
  const [tokenCount, setTokenCount] = React.useState(0);

  // Typewriter: reveal tokens progressively
  React.useEffect(() => {
    if (lineIdx >= TERMINAL_SCRIPT.length) return;
    const currentLine = TERMINAL_SCRIPT[lineIdx];
    if (tokIdx >= currentLine.length) {
      // finalize line
      const t = setTimeout(() => {
        setLines(prev => [...prev, currentLine]);
        setTokens([]);
        setTokIdx(0);
        setLineIdx(i => i + 1);
      }, 200);
      return () => clearTimeout(t);
    }
    const delay = 60 + Math.random() * 90;
    const t = setTimeout(() => {
      setTokens(prev => [...prev, currentLine[tokIdx]]);
      setTokIdx(i => i + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [lineIdx, tokIdx]);

  // Loop after finish
  React.useEffect(() => {
    if (lineIdx >= TERMINAL_SCRIPT.length) {
      const t = setTimeout(() => {
        setLines([]);
        setLineIdx(0);
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [lineIdx]);

  // Token counter ticker
  React.useEffect(() => {
    const id = setInterval(() => {
      setTokenCount(c => c + Math.floor(Math.random() * 47) + 5);
    }, 240);
    return () => clearInterval(id);
  }, []);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="relative" style={{ perspective: 1600 }}>
      {/* glow behind */}
      <div className="absolute -inset-12 rounded-[48px] bg-gradient-to-br from-tide/20 via-transparent to-coral/20 blur-2xl pointer-events-none" />
      <heroMotion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative rounded-[28px] overflow-hidden"
      >
        {/* Glass shell */}
        <div className="glass-dark rounded-[28px] overflow-hidden">
          {/* Titlebar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-black/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            </div>
            <div className="font-mono text-[11px] text-zinc-400 tracking-widest uppercase">
              pitter_autonomous_core.sh
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-foam/70">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-foam"></span>
              LIVE
            </div>
          </div>

          <div className="p-6 md:p-7 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6">
            {/* Agent header + terminal */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="relative p-3 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ imageRendering: 'pixelated' }}>
                    <path d="M6 2h12v2H6zM4 4h2v4H4zM18 4h2v4h-2zM2 8h2v8H2zM20 8h2v8h-2zM8 8h2v2H8zM14 8h2v2h-2zM8 12h8v2H8zM4 16h2v4H4zM18 16h2v4h-2zM6 20h12v2H6z" fill="#5eead4"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-retro text-[13px] text-sand leading-relaxed tracking-wide">Agent_Nexus</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-foam opacity-75 animate-ping"></span>
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-foam"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-foam">ONLINE · v4.2.1</span>
                  </div>
                </div>
              </div>

              {/* Terminal screen */}
              <div className="relative bg-abyss/60 rounded-2xl border border-foam/10 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foam/60 to-transparent" />
                <div className="px-5 py-4 h-[210px] overflow-hidden font-mono text-[12.5px] thin-scroll">
                  <div className="flex flex-col gap-1.5">
                    {lines.map((tks, i) => (
                      <SyntaxLine key={i} tokens={tks} />
                    ))}
                    {lineIdx < TERMINAL_SCRIPT.length && (
                      <div className="flex items-center">
                        <SyntaxLine tokens={tokens} />
                        <span className="caret ml-1" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Side status cards */}
            <div className="flex flex-col gap-3">
              {/* Sentinel node */}
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-seaglass to-seaglass/60 overflow-hidden border border-white/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-tide-pressed">Sentinel Node</span>
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <div className="absolute w-5 h-5 rounded-full bg-tide/40 pulse-ring" />
                    <div className="relative w-2 h-2 rounded-full bg-tide" />
                  </div>
                </div>
                <div className="text-[22px] font-black text-deep-ocean leading-none">85%</div>
                <div className="mt-2 h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <heroMotion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-tide to-foam"
                  />
                </div>
                <div className="mt-2 text-[9px] text-tide-pressed/80 font-mono">MICROBIAL · OPTIMAL</div>
              </div>

              {/* Context window */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-shell to-shell/60 border border-white/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8a3f1f]">Context Window</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <heroMotion.div
                    key={tokenCount}
                    initial={{ y: -4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-[22px] font-black text-[#8a3f1f] tabular-nums leading-none"
                  >
                    {(32450 + (tokenCount % 20000)).toLocaleString()}
                  </heroMotion.div>
                  <span className="text-[10px] text-[#8a3f1f]/70 font-mono">tokens</span>
                </div>
                <div className="mt-2 flex gap-0.5">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-1.5 rounded-sm"
                      style={{
                        background: i < 14 ? '#ff8a65' : 'rgba(255,138,101,0.25)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* GPU / throughput */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-foam/10 to-foam/5 border border-foam/15">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foam/70">Throughput</span>
                  <span className="text-[10px] font-mono text-foam">+12%</span>
                </div>
                <div className="text-[20px] font-black text-sand tabular-nums leading-none">2.4<span className="text-sm text-foam/60 font-normal ml-1">k tok/s</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Glare overlay — follows mouse */}
        <heroMotion.div
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            background: heroUseTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${x} ${y}, rgba(255,255,255,0.12), transparent 40%)`
            ),
          }}
        />
      </heroMotion.div>
    </div>
  );
}

function Hero() {
  return (
    <section id="agents" className="relative pt-36 md:pt-44 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center relative">
        <heroMotion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-horizon/70 text-[12px] font-medium text-driftwood mb-8"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-foam opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-tide"></span>
          </span>
          <span>Autonomous systems · v4 deployed</span>
        </heroMotion.div>

        <heroMotion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[44px] sm:text-[64px] md:text-[88px] font-black leading-[0.98] hero-letter-spacing text-deep-ocean"
        >
          Where technical<br />
          <span className="relative inline-block">
            <span className="italic font-black shimmer">complexity</span>
            <heroMotion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-tide to-coral origin-left rounded-full"
            />
          </span>{' '}
          gets visual.
        </heroMotion.h1>

        <heroMotion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[18px] md:text-[22px] text-driftwood max-w-2xl mx-auto mt-7 leading-relaxed text-pretty"
        >
          A SMK RssN combina engenharia de ponta com design colaborativo para orquestrar agentes autônomos e automações massivas.
        </heroMotion.p>

        <heroMotion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-9"
        >
          <button className="group relative bg-deep-ocean text-sand px-6 py-3.5 rounded-xl font-semibold text-[15px] overflow-hidden">
            <span className="relative z-10 flex items-center gap-1.5">
              Deploy an agent
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-tide to-foam translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>
          <button className="px-6 py-3.5 rounded-xl font-semibold text-[15px] text-deep-ocean bg-white/70 backdrop-blur-md border border-horizon hover:bg-white transition-colors">
            See live pipeline
          </button>
        </heroMotion.div>
      </div>

      <heroMotion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 md:mt-20 max-w-5xl mx-auto"
      >
        <Terminal3D />
      </heroMotion.div>
    </section>
  );
}

window.Hero = Hero;
