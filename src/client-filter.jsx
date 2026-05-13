const { motion: cfMotion } = window.framerMotion || window.Motion || window.FramerMotion;

const FOR = [
  'Empresas que precisam de site institucional ou presença digital',
  'Negócios que querem lançar um webapp ou sistema web',
  'Empreendedores com ideia para um app mobile',
  'Comércios e serviços prontos para crescer no digital',
];

const NOT_FOR = [
  'Projetos sem objetivo claro definido',
  'Quem precisa de resultado em menos de 4 semanas',
  'Quem quer um parceiro técnico fixo e permanente',
  'Projetos que já têm time de desenvolvimento interno',
];

function ClientFilter() {
  return (
    <section id="para-quem" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent" />
      <div className="max-w-6xl mx-auto">

        <cfMotion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tide/10 border border-tide/20 text-[11px] font-bold tracking-widest uppercase text-tide mb-5">
            Para Quem
          </div>
          <h2 className="text-[36px] md:text-[56px] font-black hero-letter-spacing leading-[1.02] text-deep-ocean">
            Feito para empresas<br />
            <span className="text-driftwood/60">que querem crescer online.</span>
          </h2>
          <p className="mt-5 text-driftwood max-w-lg mx-auto leading-relaxed">
            Trabalhamos com empresas que querem presença digital profissional — e estão prontas para dar esse passo.
          </p>
        </cfMotion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <cfMotion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-[28px] p-8"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-xl bg-seaglass flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-tide-pressed">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span className="text-[13px] font-bold uppercase tracking-widest text-tide-pressed">
                Trabalhamos com
              </span>
            </div>
            <ul className="space-y-4">
              {FOR.map(item => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-deep-ocean">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-tide shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </cfMotion.div>

          <cfMotion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-[28px] p-8"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-xl bg-shell flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-coral">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
              <span className="text-[13px] font-bold uppercase tracking-widest text-coral">
                Não trabalhamos com
              </span>
            </div>
            <ul className="space-y-4">
              {NOT_FOR.map(item => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-driftwood">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-driftwood/40 shrink-0 mt-0.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </cfMotion.div>

        </div>

        <cfMotion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center mt-14"
        >
          <p className="text-driftwood mb-5 text-[15px]">
            Pronto para ter sua empresa online com um projeto sólido e entregue? A próxima etapa é uma conversa de 30 minutos.
          </p>
          <button
            onClick={() => window.openQuoteForm && window.openQuoteForm()}
            className="group relative bg-deep-ocean text-sand px-7 py-3.5 rounded-xl font-semibold text-[15px] overflow-hidden inline-flex items-center gap-1.5"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Pedir Orçamento
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-tide to-foam translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>
        </cfMotion.div>

      </div>
    </section>
  );
}

window.ClientFilter = ClientFilter;
