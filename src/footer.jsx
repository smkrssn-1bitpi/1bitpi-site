export function Footer() {
  return (
    <footer id="booking" className="relative border-t border-zinc-200/60 py-20 px-6 mt-10">
      <div className="max-w-6xl mx-auto">

        {/* CTA block */}
        <div className="glass rounded-[32px] p-10 md:p-14 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tide/10 border border-tide/20 text-[11px] font-bold tracking-widest uppercase text-tide mb-5">
            Próximo passo
          </div>
          <h2 className="text-[32px] md:text-[48px] font-black hero-letter-spacing leading-tight text-deep-ocean mb-4">
            Sua empresa online<br />
            <span className="text-tide">em 4 semanas.</span>
          </h2>
          <p className="text-driftwood max-w-md mx-auto text-[15px] leading-relaxed mb-8">
            Conversa de 30 minutos, sem compromisso. Entendemos o que você precisa e confirmamos se faz sentido avançar juntos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.openQuoteForm && window.openQuoteForm()}
              className="group relative bg-deep-ocean text-sand px-8 py-4 rounded-xl font-bold text-[15px] overflow-hidden inline-flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                Pedir Orçamento
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-tide to-foam translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </button>
            <a
              href="https://wa.me/5511972294623"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold text-[15px] text-deep-ocean bg-white/70 backdrop-blur-md border border-horizon hover:bg-white transition-colors inline-flex items-center gap-2 no-underline"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-tide rounded-[9px] rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-tide to-foam rounded-[9px] flex items-center justify-center text-sand font-black text-base">
                  1
                </div>
              </div>
              <span className="font-bold text-[16px] tracking-tight text-deep-ocean">
                1<span className="text-tide">Bitpi</span>
              </span>
            </div>
            <p className="text-zinc-500 text-[13px] max-w-xs leading-relaxed">
              Sites, webapps e aplicativos mobile para empresas que querem presença digital profissional.
            </p>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">Serviços</div>
            <ul className="space-y-2 text-[14px] text-zinc-600">
              <li>Site Institucional</li>
              <li>Website</li>
              <li>Webapp</li>
              <li>App Mobile</li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">Contato</div>
            <ul className="space-y-2 text-[14px] text-zinc-600">
              <li>
                <a href="mailto:caue.antonacci@1bitpi.com.br" className="hover:text-tide transition-colors no-underline">
                  caue.antonacci@1bitpi.com.br
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511972294623" target="_blank" rel="noopener noreferrer" className="hover:text-tide transition-colors no-underline">
                  (11) 97229-4623
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-200/60">
          <div className="text-[12px] text-zinc-400 font-mono">© 2026 1Bitpi. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-tide animate-pulse"></div>
            <span className="text-[11px] text-zinc-400 font-mono uppercase tracking-wider">Online</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
