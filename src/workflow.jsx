const { motion: wfMotion, AnimatePresence: WfAP, useInView: wfUseInView, useAnimation: wfUseAnim } = window.framerMotion || window.Motion || window.FramerMotion;

function DataPacket({ pathId, active, color = '#5b76fe', delay = 0 }) {
  if (!active) return null;
  return (
    <>
      {[0, 0.25, 0.5].map((d, i) => (
        <circle key={i} r="5" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
          <animateMotion dur="1.2s" begin={`${delay + d}s`} repeatCount="1">
            <mpath href={`#${pathId}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" begin={`${delay + d}s`} repeatCount="1" />
          <animate attributeName="r" values="3;6;6;3" dur="1.2s" begin={`${delay + d}s`} repeatCount="1" />
        </circle>
      ))}
    </>
  );
}

function NodeCard({ children, className = '', label, pulse = false, color = '#5b76fe' }) {
  return (
    <div className={`relative ${className}`}>
      {pulse && (
        <>
          <div className="absolute inset-0 rounded-[28px] pointer-events-none" style={{ boxShadow: `0 0 0 0 ${color}`, animation: 'pulseRing 1.6s ease-out infinite' }} />
          <div className="absolute -inset-2 rounded-[32px] pointer-events-none" style={{ background: `radial-gradient(circle, ${color}33 0%, transparent 70%)` }} />
        </>
      )}
      {children}
    </div>
  );
}

function Workflow() {
  const sectionRef = React.useRef(null);
  const inView = wfUseInView ? wfUseInView(sectionRef, { once: true, amount: 0.2 }) : true;

  // states: idle, flowing1, processing, flowing2, done
  const [state, setState] = React.useState('idle');
  const [ripples, setRipples] = React.useState([]);

  // positions in viewBox coordinates
  const positions = {
    trigger: { x: 140, y: 220 },
    engine: { x: 600, y: 220 },
    outputA: { x: 1050, y: 110 },
    outputB: { x: 1050, y: 330 },
  };

  const trigger = () => {
    if (state !== 'idle') return;
    setState('flowing1');
    setTimeout(() => {
      setState('processing');
      // ripple
      const id = Date.now();
      setRipples(r => [...r, id, id + 1]);
      setTimeout(() => setRipples(r => r.filter(x => x !== id && x !== id + 1)), 1800);
    }, 900);
    setTimeout(() => setState('flowing2'), 2200);
    setTimeout(() => setState('done'), 3500);
    setTimeout(() => setState('idle'), 5200);
  };

  const statusText = {
    idle: 'Awaiting Input',
    flowing1: 'Receiving Payload',
    processing: 'Transforming Data',
    flowing2: 'Dispatching Actions',
    done: 'Complete',
  }[state];

  // Springy node taps
  const [tapScale, setTapScale] = React.useState({ trigger: 1, engine: 1, outputA: 1, outputB: 1 });
  const tap = (k) => {
    setTapScale(s => ({ ...s, [k]: 0.92 }));
    setTimeout(() => setTapScale(s => ({ ...s, [k]: 1 })), 180);
  };

  return (
    <section id="workflow" ref={sectionRef} className="relative py-28 md:py-36 px-6 overflow-hidden">
      {/* subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <wfMotion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tide/10 border border-tide/20 text-[11px] font-bold tracking-widest uppercase text-tide mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            Architectural Blueprint
          </div>
          <h2 className="text-[40px] md:text-[64px] font-black hero-letter-spacing leading-[1.02] text-deep-ocean">
            Live data pipelines<br />
            <span className="text-driftwood/70">orchestrated in real-time.</span>
          </h2>
          <p className="mt-5 text-driftwood max-w-xl mx-auto">
            Clique no gatilho para simular a orquestração. Cada nó responde com física real e packets percorrem os dutos.
          </p>
        </wfMotion.div>

        {/* Canvas */}
        <div className="relative rounded-[32px] overflow-hidden glass p-8 md:p-10">
          {/* grid background */}
          <div className="absolute inset-0 dot-grid opacity-60" />

          {/* SVG layer */}
          <div className="relative w-full" style={{ aspectRatio: '1200 / 440' }}>
            <svg viewBox="0 0 1200 440" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pipeGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#0891a6" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#5eead4" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0891a6" stopOpacity="0.15" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Path 1: trigger → engine */}
              <path
                id="wf-path1"
                d={`M ${positions.trigger.x} ${positions.trigger.y} C 340 ${positions.trigger.y}, 400 ${positions.engine.y}, ${positions.engine.x} ${positions.engine.y}`}
                stroke="#c7cad5"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 6"
              />
              {/* Path 2a: engine → output A */}
              <path
                id="wf-path2a"
                d={`M ${positions.engine.x} ${positions.engine.y} C 780 ${positions.engine.y}, 880 ${positions.outputA.y}, ${positions.outputA.x} ${positions.outputA.y}`}
                stroke="#c7cad5"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 6"
              />
              {/* Path 2b: engine → output B */}
              <path
                id="wf-path2b"
                d={`M ${positions.engine.x} ${positions.engine.y} C 780 ${positions.engine.y}, 880 ${positions.outputB.y}, ${positions.outputB.x} ${positions.outputB.y}`}
                stroke="#c7cad5"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 6"
              />

              {/* Active path overlays */}
              {state === 'flowing1' && (
                <path
                  d={`M ${positions.trigger.x} ${positions.trigger.y} C 340 ${positions.trigger.y}, 400 ${positions.engine.y}, ${positions.engine.x} ${positions.engine.y}`}
                  stroke="url(#pipeGrad)"
                  strokeWidth="4"
                  fill="none"
                  filter="url(#glow)"
                />
              )}
              {state === 'flowing2' && (
                <>
                  <path
                    d={`M ${positions.engine.x} ${positions.engine.y} C 780 ${positions.engine.y}, 880 ${positions.outputA.y}, ${positions.outputA.x} ${positions.outputA.y}`}
                    stroke="url(#pipeGrad)"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#glow)"
                  />
                  <path
                    d={`M ${positions.engine.x} ${positions.engine.y} C 780 ${positions.engine.y}, 880 ${positions.outputB.y}, ${positions.outputB.x} ${positions.outputB.y}`}
                    stroke="url(#pipeGrad)"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#glow)"
                  />
                </>
              )}

              {/* Data packets traveling */}
              {state === 'flowing1' && <DataPacket pathId="wf-path1" active color="#5eead4" />}
              {state === 'flowing2' && (
                <>
                  <DataPacket pathId="wf-path2a" active color="#5eead4" />
                  <DataPacket pathId="wf-path2b" active color="#ff8a65" delay={0.1} />
                </>
              )}
            </svg>

            {/* Trigger node */}
            <wfMotion.button
              onClick={() => { trigger(); tap('trigger'); }}
              animate={{ scale: tapScale.trigger }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              whileHover={{ y: -3 }}
              className="absolute z-10"
              style={{ left: '11%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-tide/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative glass rounded-2xl p-4 w-[160px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tide to-foam flex items-center justify-center text-sand shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-driftwood">Webhook</span>
                  </div>
                  <div className="text-left">
                    <div className="text-[13px] font-bold text-deep-ocean">Trigger Flow</div>
                    <div className="text-[10px] text-driftwood/70 font-mono mt-0.5">POST /v1/orchestrate</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-horizon/60 text-[10px] font-mono text-tide font-bold uppercase tracking-wider">
                    Click to fire →
                  </div>
                </div>
              </div>
            </wfMotion.button>

            {/* Engine node (center) */}
            <wfMotion.div
              animate={{
                scale: tapScale.engine * (state === 'processing' ? 1.04 : 1),
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="absolute z-10"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <NodeCard pulse={state === 'processing'} color="#5eead4">
                <div onClick={() => tap('engine')} className="relative glass rounded-[24px] p-5 w-[200px] cursor-pointer">
                  {/* ripples */}
                  <WfAP>
                    {state === 'processing' && (
                      <wfMotion.div
                        key="ripple"
                        initial={{ scale: 0.9, opacity: 0.8 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 1.6, ease: 'easeOut', repeat: Infinity }}
                        className="absolute inset-0 rounded-[24px] border-2 border-foam pointer-events-none"
                      />
                    )}
                  </WfAP>

                  <div className="flex items-center justify-between mb-3">
                    <wfMotion.div
                      animate={state === 'processing' ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 1.2, repeat: state === 'processing' ? Infinity : 0, ease: 'linear' }}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-ocean to-abyss flex items-center justify-center text-foam"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                      </svg>
                    </wfMotion.div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-driftwood/70">Core</span>
                  </div>
                  <div className="text-[15px] font-black text-deep-ocean leading-tight">SMK Orchestrator</div>
                  <div className="mt-3 pt-3 border-t border-horizon/60 flex items-center gap-1.5">
                    <wfMotion.span
                      key={state}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        state === 'idle' ? 'text-driftwood/60' :
                        state === 'done' ? 'text-tide' : 'text-coral'
                      }`}
                    >
                      {statusText}
                    </wfMotion.span>
                    {state !== 'idle' && state !== 'done' && (
                      <span className="inline-flex gap-0.5">
                        {[0, 150, 300].map(d => (
                          <wfMotion.span
                            key={d}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1, repeat: Infinity, delay: d / 1000 }}
                            className="w-1 h-1 rounded-full bg-coral"
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              </NodeCard>
            </wfMotion.div>

            {/* Output A */}
            <wfMotion.div
              animate={{
                scale: tapScale.outputA,
                opacity: state === 'done' || state === 'flowing2' ? 1 : 0.5,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="absolute z-10"
              style={{ left: '87%', top: '25%', transform: 'translate(-50%, -50%)' }}
              onClick={() => tap('outputA')}
            >
              <div className="glass rounded-2xl p-3.5 w-[180px] cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-seaglass flex items-center justify-center text-tide-pressed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-deep-ocean leading-tight">Slack notify</div>
                    <div className="text-[9px] text-driftwood/70 font-mono mt-0.5">#ops-channel</div>
                  </div>
                </div>
              </div>
            </wfMotion.div>

            {/* Output B */}
            <wfMotion.div
              animate={{
                scale: tapScale.outputB,
                opacity: state === 'done' || state === 'flowing2' ? 1 : 0.5,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="absolute z-10"
              style={{ left: '87%', top: '75%', transform: 'translate(-50%, -50%)' }}
              onClick={() => tap('outputB')}
            >
              <div className="glass rounded-2xl p-3.5 w-[180px] cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-shell flex items-center justify-center text-coral">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-deep-ocean leading-tight">DB upsert</div>
                    <div className="text-[9px] text-driftwood/70 font-mono mt-0.5">postgres:events</div>
                  </div>
                </div>
              </div>
            </wfMotion.div>
          </div>

          {/* Legend / stats strip */}
          <div className="mt-6 pt-6 border-t border-horizon/60 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: 'Latency', v: '42ms', c: 'text-tide' },
              { k: 'Nodes active', v: '12', c: 'text-coral' },
              { k: 'Throughput', v: '2.4k/s', c: 'text-deep-ocean' },
              { k: 'Uptime', v: '99.98%', c: 'text-deep-ocean' },
            ].map(s => (
              <div key={s.k}>
                <div className="text-[10px] font-mono uppercase tracking-widest text-driftwood/70">{s.k}</div>
                <div className={`text-[20px] font-black tabular-nums mt-1 ${s.c}`}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Workflow = Workflow;
