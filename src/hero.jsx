import { motion as heroMotion } from 'framer-motion';

const TRUST_CHIPS = ['Site Institucional', 'Website', 'Webapp', 'App Mobile'];

export function Hero() {
  return (
    <section id="hero" className="relative pt-36 md:pt-44 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center relative">

        <heroMotion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-horizon/70 text-[12px] font-medium text-driftwood mb-8"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-tide opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-tide"></span>
          </span>
          Sites · Websites · Webapps · Apps Mobile
        </heroMotion.div>

        <heroMotion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[52px] sm:text-[72px] md:text-[92px] font-black leading-[0.95] hero-letter-spacing text-deep-ocean"
        >
          Criamos.<br />
          <span className="shimmer">Entregamos.</span><br />
          É seu.
        </heroMotion.h1>

        <heroMotion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[18px] md:text-[21px] text-driftwood max-w-2xl mx-auto mt-7 leading-relaxed text-pretty"
        >
          Sites, websites, webapps e aplicativos mobile para empresas que querem
          presença digital profissional — entregues em 4 semanas, com escopo fixo.
        </heroMotion.p>

        <heroMotion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-9"
        >
          <button
            onClick={() => window.openQuoteForm && window.openQuoteForm()}
            className="group relative bg-deep-ocean text-sand px-6 py-3.5 rounded-xl font-semibold text-[15px] overflow-hidden inline-flex items-center gap-1.5"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Pedir Orçamento
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-tide to-foam translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>
          <a
            href="#como-funciona"
            className="px-6 py-3.5 rounded-xl font-semibold text-[15px] text-deep-ocean bg-white/70 backdrop-blur-md border border-horizon hover:bg-white transition-colors inline-flex items-center no-underline"
          >
            Como funciona
          </a>
        </heroMotion.div>

        <heroMotion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-10"
        >
          {TRUST_CHIPS.map(chip => (
            <span key={chip} className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-tide/10 border border-tide/20 text-tide-pressed">
              {chip}
            </span>
          ))}
        </heroMotion.div>

      </div>
    </section>
  );
}
