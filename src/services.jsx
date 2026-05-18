import { motion as svcMotion } from 'framer-motion';

const SCOPE_INCLUDES = [
  'Design de arquitetura',
  'Implementação completa',
  'Testes automatizados',
  'Sessões de treinamento gravadas',
  'Documentação e chamada de entrega',
  '30 dias de garantia pós-entrega',
];

const SCOPE_EXCLUDES = [
  'Mensalidade ou retainer fixo',
  'Suporte técnico permanente',
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-tide shrink-0">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-driftwood/50 shrink-0">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function SprintOffer() {
  return (
    <section id="a-oferta" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent" />
      <div className="max-w-6xl mx-auto">

        <svcMotion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tide/10 border border-tide/20 text-[11px] font-bold tracking-widest uppercase text-tide mb-5">
            A Oferta
          </div>
          <h2 className="text-[36px] md:text-[56px] font-black hero-letter-spacing leading-[1.02] text-deep-ocean">
            Projeto Digital 1Bitpi
          </h2>
          <p className="mt-4 text-driftwood max-w-xl mx-auto text-[16px] leading-relaxed">
            Seu site, webapp ou app construído do zero — arquitetado, implementado,
            testado e entregue em 4 semanas. Escopo fixo, resultado definido, você opera depois.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {['Site Institucional', 'Website', 'Webapp', 'App Mobile'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-deep-ocean/5 border border-deep-ocean/10 text-deep-ocean">
                {s}
              </span>
            ))}
          </div>
        </svcMotion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <svcMotion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-[28px] p-8 md:p-10"
          >
            <div className="text-[11px] font-mono uppercase tracking-widest text-driftwood/70 mb-6">
              O que está incluído
            </div>
            <ul className="space-y-3.5 mb-8">
              {SCOPE_INCLUDES.map(item => (
                <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-deep-ocean">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-horizon/60">
              <div className="text-[11px] font-mono uppercase tracking-widest text-driftwood/70 mb-4">
                Não incluso
              </div>
              <ul className="space-y-2.5 mb-5">
                {SCOPE_EXCLUDES.map(item => (
                  <li key={item} className="flex items-center gap-3 text-[14px] text-driftwood/60">
                    <XIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-tide/10 border border-tide/15">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tide shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                </svg>
                <p className="text-[12px] text-driftwood leading-relaxed">
                  <span className="font-semibold text-tide-pressed">Banco de horas avulsas disponível</span> após a entrega — sem mensalidade, sem compromisso. Você compra horas quando precisar.
                </p>
              </div>
            </div>
          </svcMotion.div>

          <div className="flex flex-col gap-6">

            <svcMotion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-[28px] p-8"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[13px] text-driftwood">A partir de</span>
                <span className="text-[42px] font-black text-deep-ocean hero-letter-spacing">R$ 1.500</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tide">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span className="text-[13px] text-driftwood">4 semanas · prazo fixo</span>
              </div>
              <button
                onClick={() => window.openQuoteForm && window.openQuoteForm()}
                className="group relative w-full bg-deep-ocean text-sand px-6 py-3.5 rounded-xl font-semibold text-[15px] overflow-hidden flex items-center justify-center gap-1.5"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Pedir Orçamento
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-tide to-foam translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
              <p className="mt-3 text-center text-[12px] text-driftwood/60">
                A sessão é gratuita. Confirmamos escopo e fit antes de qualquer compromisso.
              </p>
            </svcMotion.div>

            <svcMotion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-[28px] p-6 flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tide to-foam flex items-center justify-center text-sand font-black text-[20px] shrink-0 shadow-[0_4px_16px_rgba(8,145,166,0.3)]">
                CA
              </div>
              <div>
                <div className="font-bold text-[15px] text-deep-ocean">Cauê Antonacci</div>
                <div className="text-[12px] text-driftwood mt-0.5">Fundador · Engenheiro de Software</div>
                <div className="text-[12px] text-driftwood/70 mt-2 leading-relaxed">
                  Cada sprint é liderado por mim. Você fala com quem constrói.
                </div>
              </div>
            </svcMotion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
