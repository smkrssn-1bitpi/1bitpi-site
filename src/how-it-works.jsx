const { motion: hiwMotion } = window.framerMotion || window.Motion || window.FramerMotion;

const PHASES = [
  {
    week: 'Semana 0',
    name: 'Sessão de Descoberta',
    deliverable: 'Diagnóstico do problema, alinhamento de expectativas e confirmação de fit.',
    end: 'Decisão de prosseguir — ou não.',
    accent: 'text-tide-pressed',
    num: '01',
  },
  {
    week: 'Semana 1',
    name: 'Arquitetura & Aprovação',
    deliverable: 'Proposta de arquitetura detalhada, escopo fechado e contrato assinado.',
    end: 'Escopo congelado. Sem surpresas.',
    accent: 'text-tide',
    num: '02',
  },
  {
    week: 'Semanas 2–3',
    name: 'Implementação & Testes',
    deliverable: 'Sistema construído, testado e documentado em ciclos curtos com visibilidade contínua.',
    end: 'Código em produção.',
    accent: 'text-[#8a3f1f]',
    num: '03',
  },
  {
    week: 'Semana 4',
    name: 'Treinamento + Entrega',
    deliverable: 'Sessões de treinamento gravadas, documentação completa e chamada de handover.',
    end: 'Você opera de forma independente.',
    accent: 'text-tide',
    num: '04',
  },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent" />
      <div className="max-w-6xl mx-auto">

        <hiwMotion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tide/10 border border-tide/20 text-[11px] font-bold tracking-widest uppercase text-tide mb-5">
            Como Funciona
          </div>
          <h2 className="text-[36px] md:text-[56px] font-black hero-letter-spacing leading-[1.02] text-deep-ocean">
            Quatro fases.<br />
            <span className="text-driftwood/60">Uma entrega limpa.</span>
          </h2>
          <p className="mt-5 text-driftwood max-w-xl mx-auto leading-relaxed">
            Cada fase tem um entregável definido e um fim claro. Você sabe o que acontece e quando.
          </p>
        </hiwMotion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PHASES.map((phase, i) => (
            <hiwMotion.div
              key={phase.num}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {i < PHASES.length - 1 && (
                <div className="hidden lg:block absolute top-[28px] left-full w-5 h-px bg-gradient-to-r from-horizon to-horizon/30 z-10" />
              )}
              <div className="glass rounded-[24px] p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[28px] font-black hero-letter-spacing ${phase.accent} leading-none`}>
                    {phase.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-driftwood/60">
                    {phase.week}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-deep-ocean leading-tight mb-3">
                  {phase.name}
                </h3>
                <p className="text-[13px] text-driftwood leading-relaxed flex-1">
                  {phase.deliverable}
                </p>
                <div className="mt-5 pt-4 border-t border-horizon/60">
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={phase.accent}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className={`text-[11px] font-mono font-bold ${phase.accent}`}>
                      {phase.end}
                    </span>
                  </div>
                </div>
              </div>
            </hiwMotion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

window.HowItWorks = HowItWorks;
