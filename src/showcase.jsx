import { useState } from 'react';
import { motion as scMotion, AnimatePresence as ScAP } from 'framer-motion';

function BrowserMockup({ type }) {
  if (type === 'site') {
    return (
      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 text-[10px] font-mono">
        <div className="flex items-center gap-1 px-3 py-2 bg-black/30 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
          <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
          <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
          <div className="ml-2 flex-1 bg-white/10 rounded-sm px-2 py-0.5 text-white/40 text-[9px]">
            sua-empresa.com.br
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="h-4 w-1/2 rounded bg-tide/30"></div>
          <div className="h-2 w-3/4 rounded bg-white/10"></div>
          <div className="h-2 w-2/3 rounded bg-white/10"></div>
          <div className="mt-3 flex gap-2">
            <div className="h-6 w-20 rounded-lg bg-tide/40"></div>
            <div className="h-6 w-16 rounded-lg bg-white/10"></div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-white/5 border border-white/5"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'webapp') {
    return (
      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 text-[10px] font-mono">
        <div className="flex items-center gap-1 px-3 py-2 bg-black/30 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
          <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
          <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
          <div className="ml-2 text-white/40 text-[9px]">Dashboard — Reservas</div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="h-3 w-16 rounded bg-tide/30"></div>
            <div className="h-4 w-12 rounded-lg bg-tide/20 border border-tide/30"></div>
          </div>
          {[
            { name: 'Ana M.', status: 'Confirmado', color: 'bg-foam/30' },
            { name: 'Carlos R.', status: 'Pendente', color: 'bg-coral/20' },
            { name: 'Lucia T.', status: 'Confirmado', color: 'bg-foam/30' },
            { name: 'Pedro S.', status: 'Check-in', color: 'bg-tide/20' },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-white/70 text-[9px]">{row.name}</span>
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${row.color} text-white/80`}>{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[120px]">
      <div className="rounded-[24px] border-2 border-white/20 bg-gradient-to-b from-deep-ocean to-abyss overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-3 pt-2 pb-1">
          <span className="text-[7px] text-white/60 font-mono">9:41</span>
          <div className="flex gap-0.5 items-center">
            <div className="w-3 h-1.5 rounded-sm bg-foam/60"></div>
          </div>
        </div>
        <div className="px-3 pt-1 pb-2 border-b border-white/5">
          <div className="text-[10px] font-bold text-sand">Sua Empresa</div>
          <div className="text-[8px] text-tide mt-0.5">App Mobile</div>
        </div>
        <div className="mx-2 mt-2 rounded-xl bg-gradient-to-r from-tide to-foam p-2">
          <div className="text-[8px] text-deep-ocean font-bold leading-tight">Promoção do<br/>Fim de Semana</div>
          <div className="mt-1 text-[7px] bg-deep-ocean text-sand rounded px-1.5 py-0.5 inline-block">Ver oferta</div>
        </div>
        <div className="px-2 pt-2 space-y-1.5 pb-3">
          {['Reservar', 'Cardápio', 'Fidelidade'].map(a => (
            <div key={a} className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg bg-white/5 border border-white/5">
              <div className="w-3 h-3 rounded-md bg-tide/30"></div>
              <span className="text-[8px] text-white/70">{a}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-around py-2 border-t border-white/5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-md ${i === 0 ? 'bg-tide/40' : 'bg-white/10'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TABS = [
  {
    id: 'site',
    label: 'Site',
    chip: 'SITE INSTITUCIONAL',
    chipColor: 'bg-foam/20 text-foam border-foam/30',
    title: 'Sua empresa no Google.',
    body: 'Presença digital profissional. Apareça em buscas, apresente seus serviços e capture leads com um site que funciona como seu melhor vendedor.',
    features: [
      'Posicionamento no Google e Google Maps',
      'Design responsivo — mobile e desktop',
      'Formulário de contato e WhatsApp integrado',
      'Carregamento rápido com SSL incluso',
    ],
    mockup: 'site',
  },
  {
    id: 'webapp',
    label: 'Webapp',
    chip: 'WEBAPP',
    chipColor: 'bg-tide/20 text-tide border-tide/30',
    title: 'Sua operação no navegador.',
    body: 'Sistema completo acessado direto pelo browser — sem instalar nada. Você gerencia dados, pedidos e clientes em tempo real de qualquer dispositivo.',
    features: [
      'Painel de controle de qualquer dispositivo',
      'Automação que poupa horas de trabalho',
      'Relatórios e histórico em tempo real',
      'Integrações com ferramentas existentes',
    ],
    mockup: 'webapp',
  },
  {
    id: 'app',
    label: 'App',
    chip: 'APP MOBILE',
    chipColor: 'bg-coral/20 text-coral border-coral/30',
    title: 'Na palma da mão do seu cliente.',
    body: 'Aplicativo iOS + Android com notificações push, fidelidade e pedidos com um toque — a experiência que nenhum site consegue replicar.',
    features: [
      'Notificações push para promoções e avisos',
      'Reserva e pedidos com um toque',
      'Programa de pontos e fidelidade',
      'Distribuído via App Store e Google Play',
    ],
    mockup: 'phone',
  },
];

const SERVICE_CARDS = [
  {
    id: 'site',
    label: 'SITE INSTITUCIONAL',
    title: 'Vitrine profissional no Google',
    body: 'Apareça em buscas, apresente sua marca e capture leads. Construído para posicionamento e conversão real.',
    accent: '#0891a6',
  },
  {
    id: 'webapp',
    label: 'WEBAPP',
    title: 'Sistema sem instalar nada',
    body: 'Painel de controle acessível de qualquer dispositivo. Automação que poupa horas de trabalho manual todo dia.',
    accent: '#ff8a65',
  },
  {
    id: 'app',
    label: 'APP MÓVEL',
    title: 'Canal direto no celular',
    body: 'Aplicativo iOS + Android com notificações, fidelidade e pedidos na palma da mão do seu cliente.',
    accent: '#5eead4',
  },
];

export function Showcase() {
  const [active, setActive] = useState('webapp');
  const tab = TABS.find(t => t.id === active);

  return (
    <section id="exemplos" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent" />
      <div className="max-w-6xl mx-auto">

        <scMotion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tide/10 border border-tide/20 text-[11px] font-bold tracking-widest uppercase text-tide mb-5">
            O que entregamos
          </div>
          <h2 className="text-[36px] md:text-[56px] font-black hero-letter-spacing leading-[1.02] text-deep-ocean">
            Escolha o formato<br />
            <span className="text-driftwood/60">certo para seu negócio.</span>
          </h2>
          <p className="mt-5 text-driftwood max-w-xl mx-auto leading-relaxed">
            Cada formato resolve um problema diferente. A escolha certa depende de onde estão seus clientes e como eles precisam interagir com você.
          </p>
        </scMotion.div>

        <scMotion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-dark rounded-[32px] overflow-hidden mb-8"
        >
          <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-center">

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${tab.chipColor}`}>
                  {tab.chip}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-foam opacity-75 animate-ping"></span>
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-foam"></span>
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-foam/70">ONLINE</span>
                </div>
              </div>

              <ScAP mode="wait">
                <scMotion.h3
                  key={active + '-title'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-[28px] md:text-[36px] font-black text-sand leading-tight mb-4 hero-letter-spacing"
                >
                  {tab.title}
                </scMotion.h3>
              </ScAP>

              <ScAP mode="wait">
                <scMotion.p
                  key={active + '-body'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[14px] text-sand/60 leading-relaxed mb-6"
                >
                  {tab.body}
                </scMotion.p>
              </ScAP>

              <ScAP mode="wait">
                <scMotion.ul
                  key={active + '-features'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5 mb-8"
                >
                  {tab.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-sand/80">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-tide shrink-0 mt-0.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </scMotion.ul>
              </ScAP>

              <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/5 w-fit">
                {TABS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      active === t.id
                        ? 'bg-tide text-deep-ocean shadow-sm'
                        : 'text-sand/50 hover:text-sand/80'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <ScAP mode="wait">
              <scMotion.div
                key={active + '-mockup'}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center"
              >
                {tab.mockup === 'phone'
                  ? <PhoneMockup />
                  : <BrowserMockup type={tab.mockup} />
                }
              </scMotion.div>
            </ScAP>

          </div>
        </scMotion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICE_CARDS.map((card, i) => (
            <scMotion.button
              key={card.id}
              onClick={() => setActive(card.id)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`glass rounded-[24px] p-6 text-left transition-all duration-200 hover:shadow-lg cursor-pointer border-2 ${
                active === card.id ? 'border-tide/50 shadow-lg' : 'border-transparent'
              }`}
            >
              <div className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] mb-3"
                style={{ color: card.accent }}>
                {card.label}
              </div>
              <h4 className="text-[16px] font-bold text-deep-ocean leading-tight mb-2">
                {card.title}
              </h4>
              <p className="text-[13px] text-driftwood leading-relaxed">
                {card.body}
              </p>
            </scMotion.button>
          ))}
        </div>

      </div>
    </section>
  );
}
