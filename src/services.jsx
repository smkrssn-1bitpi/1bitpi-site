// services.jsx — Serviços oferecidos pela SMK RssN
// Conteúdo original reescrito; 4 categorias + sistema de tweaks completo.

const { motion: svcMotion, AnimatePresence: SvcAP, LayoutGroup: SvcLG } =
  window.framerMotion || window.Motion || window.FramerMotion;

// ─── Defaults persistidos via EDITMODE markers ──────────────────────────────
const SERVICES_TWEAKS = /*EDITMODE-BEGIN*/{
  "sectionKicker": "Nossos Serviços",
  "sectionTitle": "Do conceito à orquestração,",
  "sectionTitleAlt": "em todas as camadas.",
  "sectionSubtitle": "Estratégia, cloud, mobile e web — entregues com certificação ISO 27001 e 9001, 10+ anos de experiência e 400+ projetos em produção.",

  "showDigital": true,
  "showCloud": true,
  "showMobile": true,
  "showWeb": true,

  "digitalTitle": "Transformação Digital",
  "digitalKicker": "01 · Strategy",
  "cloudTitle": "Cloud",
  "cloudKicker": "02 · Infrastructure",
  "mobileTitle": "Mobile",
  "mobileKicker": "03 · Apps",
  "webTitle": "Web",
  "webKicker": "04 · Platforms",

  "digital_strategy": true,
  "digital_integration": true,
  "digital_it": true,
  "digital_cx": true,
  "digital_proto": true,

  "cloud_native": true,
  "cloud_advisory": true,
  "cloud_migration": true,
  "cloud_optimize": true,
  "cloud_devops": true,
  "cloud_security": true,
  "cloud_workshop": true,

  "mobile_enterprise": true,
  "mobile_geo": true,
  "mobile_social": true,
  "mobile_voip": true,
  "mobile_chat": true,
  "mobile_payments": true,
  "mobile_imaging": true,

  "web_enterprise": true,
  "web_voip": true,
  "web_portals": true,
  "web_payments": true,
  "web_iot": true,
  "web_aiml": true,
  "web_bots": true,
  "web_social": true,
  "web_etl": true,
  "web_dam": true,

  "layout": "grid",
  "density": "comfortable",
  "cardStyle": "glass",
  "showIcons": true,
  "showNumbers": true,
  "animate": true
}/*EDITMODE-END*/;

// ─── Ícones (inline, sem dependências) ──────────────────────────────────────
const Ico = {
  digital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-7" /><circle cx="11" cy="10" r="1.2" fill="currentColor" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6.5 19Z" />
      <path d="M8 15h1M12 15h1M16 15h1" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <path d="M10 5h4" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
};

// ─── Data model ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    key: 'Digital',
    ico: 'digital',
    titleKey: 'digitalTitle',
    kickerKey: 'digitalKicker',
    accent: '#0891a6',     // tide
    tint: 'seaglass',
    showKey: 'showDigital',
    blurb: 'Planejamos e executamos transformação digital de ponta a ponta: diagnóstico, arquitetura e implantação alinhadas aos seus objetivos de negócio.',
    items: [
      { key: 'digital_strategy',    title: 'Estratégia de Transformação',   desc: 'Diagnóstico tecnológico, mapeamento de processos e roadmap alinhando ganhos de curto prazo a objetivos de longo prazo.' },
      { key: 'digital_integration', title: 'Integração Digital',             desc: 'Conexão entre sistemas legados, IoT, cloud e ERP/CRM em um ecossistema único que reduz custo operacional.' },
      { key: 'digital_it',          title: 'Transformação de TI',            desc: 'Modernização da infraestrutura, eliminação de gargalos e arquiteturas seguras, escaláveis e resilientes.' },
      { key: 'digital_cx',          title: 'Customer Experience',            desc: 'CRM, automações de atendimento e workflows que tornam a operação mais proativa, personalizada e barata.' },
      { key: 'digital_proto',       title: 'Prototipagem & Inovação',        desc: 'Validamos hipóteses com design centrado no usuário, analytics e desenvolvimento rápido antes do full-scale.' },
    ],
  },
  {
    key: 'Cloud',
    ico: 'cloud',
    titleKey: 'cloudTitle',
    kickerKey: 'cloudKicker',
    accent: '#5eead4',     // foam
    tint: 'foam',
    showKey: 'showCloud',
    blurb: 'Consultoria e engenharia cloud certificada AWS, Azure e Google. Segurança, escala e custo sob controle.',
    items: [
      { key: 'cloud_native',    title: 'Cloud-Native Development', desc: 'Arquiteturas nativas com segurança enterprise, auto-scale e uso pleno de serviços gerenciados.' },
      { key: 'cloud_advisory',  title: 'Cloud Advisory',           desc: 'Well-Architected Framework aplicado: estratégia, governança e disaster recovery sob medida.' },
      { key: 'cloud_migration', title: 'Migration Services',       desc: 'Migrações estruturadas que reduzem risco e aceleram a modernização de processos, tecnologia e infra.' },
      { key: 'cloud_optimize',  title: 'Optimized Cloud',          desc: 'Mix de On-Demand, Spot, Reserved e Dedicated otimizado por perfil de workload para cortar custo sem perder performance.' },
      { key: 'cloud_devops',    title: 'DevOps & ALM',             desc: 'Pipelines CI/CD, ambientes efêmeros e ALM ágil — entregas mais rápidas e sem atrito entre dev e ops.' },
      { key: 'cloud_security',  title: 'Security & Compliance',    desc: 'Assessments de vulnerabilidade, cloud auditing e controles de privacidade em nível enterprise.' },
      { key: 'cloud_workshop',  title: 'Workshops & Labs',         desc: 'Treinamentos por instrutores certificados AWS/Azure/Google para capacitar seu time interno.' },
    ],
  },
  {
    key: 'Mobile',
    ico: 'mobile',
    titleKey: 'mobileTitle',
    kickerKey: 'mobileKicker',
    accent: '#ff8a65',     // coral
    tint: 'shell',
    showKey: 'showMobile',
    blurb: 'Apps nativos iOS e Android com SDKs nativos, integração com backends em cloud ou on-premise e fluxos complexos em produção.',
    items: [
      { key: 'mobile_enterprise', title: 'Enterprise Mobile Apps', desc: 'Apps corporativos com fluxos críticos, offline-first e integração profunda com sistemas internos.' },
      { key: 'mobile_geo',        title: 'GEO-Location Apps',      desc: 'Geofencing, tracking em tempo real e roteirização para logística, field service e mobilidade.' },
      { key: 'mobile_social',     title: 'Social Networking',      desc: 'Feeds, perfis, mensageria e mecânicas sociais construídas para escalar desde o MVP.' },
      { key: 'mobile_voip',       title: 'VoIP Apps',              desc: 'Chamadas de voz e vídeo com baixa latência, WebRTC e infraestrutura auto-escalável.' },
      { key: 'mobile_chat',       title: 'Chatting Apps',          desc: 'Mensageria real-time, E2E encryption, presença, reações e histórico sincronizado.' },
      { key: 'mobile_payments',   title: 'Payment Integrations',   desc: 'Stripe, PayPal, Pix e gateways locais com tokenização e conformidade PCI.' },
      { key: 'mobile_imaging',    title: 'Imaging & Camera',       desc: 'Processamento de imagem, OCR, visão computacional e pipelines de câmera customizados.' },
    ],
  },
  {
    key: 'Web',
    ico: 'web',
    titleKey: 'webTitle',
    kickerKey: 'webKicker',
    accent: '#0a2540',     // deep-ocean
    tint: 'horizon',
    showKey: 'showWeb',
    blurb: 'Webapps standalone, SaaS, intranets e portais em .NET, PHP, Python, Java e Node — com stack escolhida por problema, não por moda.',
    items: [
      { key: 'web_enterprise', title: 'Enterprise Web Systems',     desc: 'Sistemas de missão crítica com SLAs rígidos, RBAC granular e integrações profundas.' },
      { key: 'web_voip',       title: 'VoIP Solutions',             desc: 'Plataformas web de comunicação com voz, vídeo e colaboração em tempo real.' },
      { key: 'web_portals',    title: 'Web Portals',                desc: 'Portais B2B, B2C e intranets com CMS, workflows e single sign-on corporativo.' },
      { key: 'web_payments',   title: 'Payment Solutions',          desc: 'Checkouts, recorrência, split de pagamento e reconciliação automatizada.' },
      { key: 'web_iot',        title: 'IoT Solutions',              desc: 'Ingestão de telemetria, dashboards e controle remoto de frotas de dispositivos.' },
      { key: 'web_aiml',       title: 'AI / ML Web Apps',           desc: 'Aplicações com modelos em produção: embeddings, classificação, previsão e pipelines MLOps.' },
      { key: 'web_bots',       title: 'Intelligent Bot Apps',       desc: 'Assistentes conversacionais, agentes com ferramentas e integração a canais (WhatsApp, Slack, web).' },
      { key: 'web_social',     title: 'Social Networks',            desc: 'Redes sociais sob medida com feed, grafos de relacionamento e moderação.' },
      { key: 'web_etl',        title: 'ETL Solutions',              desc: 'Ingestão, transformação e carga de dados entre sistemas heterogêneos com observabilidade.' },
      { key: 'web_dam',        title: 'Digital Asset Management',   desc: 'Centralização de mídia, versionamento, direitos de uso e distribuição multi-canal.' },
    ],
  },
];

// ─── Card da categoria ──────────────────────────────────────────────────────
function CategoryCard({ cat, t, idx, density, cardStyle, showIcons, showNumbers, animate }) {
  const title = t[cat.titleKey] ?? cat.key;
  const kicker = t[cat.kickerKey] ?? '';
  const visibleItems = cat.items.filter(it => t[it.key] !== false);

  const pad = density === 'compact' ? 'p-5 md:p-6' : density === 'spacious' ? 'p-8 md:p-10' : 'p-6 md:p-8';
  const gap = density === 'compact' ? 'gap-2.5' : density === 'spacious' ? 'gap-5' : 'gap-3.5';
  const itemPad = density === 'compact' ? 'py-2' : density === 'spacious' ? 'py-4' : 'py-3';
  const titleSize = density === 'compact' ? 'text-[22px]' : density === 'spacious' ? 'text-[32px]' : 'text-[26px]';

  const shellClass =
    cardStyle === 'solid'
      ? 'bg-white border border-horizon/70 shadow-[0_2px_0_rgba(10,37,64,0.04),0_20px_50px_-24px_rgba(10,37,64,0.18)]'
      : cardStyle === 'outline'
      ? 'bg-transparent border border-horizon'
      : 'glass';

  const Wrap = animate ? svcMotion.div : 'div';
  const wrapProps = animate
    ? {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.7, delay: 0.05 + idx * 0.08, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <Wrap
      {...wrapProps}
      className={`relative rounded-[28px] overflow-hidden ${shellClass} ${pad} flex flex-col`}
    >
      {/* Accent glow */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: `${cat.accent}33` }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-5">
        <div className="flex items-center gap-3.5">
          {showIcons && (
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${cat.accent}18`, color: cat.accent }}
            >
              <div className="w-6 h-6">{Ico[cat.ico]}</div>
            </div>
          )}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-driftwood/70">
              {kicker}
            </div>
            <h3 className={`${titleSize} font-black hero-letter-spacing text-deep-ocean leading-tight mt-0.5`}>
              {title}
            </h3>
          </div>
        </div>
        {showNumbers && (
          <div
            className="font-mono text-[11px] font-bold tabular-nums px-2.5 py-1 rounded-full border"
            style={{ borderColor: `${cat.accent}40`, color: cat.accent, background: `${cat.accent}0d` }}
          >
            {String(visibleItems.length).padStart(2, '0')} serviços
          </div>
        )}
      </div>

      {/* Blurb */}
      <p className="relative text-[14px] md:text-[15px] text-driftwood leading-relaxed mb-6 max-w-xl">
        {cat.blurb}
      </p>

      {/* Items list */}
      <ul className={`relative flex flex-col ${gap} flex-1`}>
        {visibleItems.map((it, i) => (
          <li
            key={it.key}
            className={`group flex items-start gap-3 ${itemPad} border-t border-horizon/60 first:border-t-0`}
          >
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${cat.accent}20`, color: cat.accent }}
            >
              <span className="w-2.5 h-2.5">{Ico.check}</span>
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold text-deep-ocean text-[14px] md:text-[15px] leading-tight">
                  {it.title}
                </span>
                {showNumbers && (
                  <span className="font-mono text-[10px] text-driftwood/50 tabular-nums shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
              </div>
              <p className="text-[12.5px] md:text-[13px] text-driftwood/90 leading-relaxed mt-1 text-pretty">
                {it.desc}
              </p>
            </div>
          </li>
        ))}
        {visibleItems.length === 0 && (
          <li className="text-[12px] font-mono text-driftwood/60 italic py-4">
            // nenhum serviço visível — ative pelo painel de Tweaks
          </li>
        )}
      </ul>

      {/* Footer */}
      <div className="relative mt-6 pt-5 border-t border-horizon/60 flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest text-driftwood/70">
          explore {title.toLowerCase()}
        </span>
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors"
          style={{ background: cat.accent, color: '#fef8ed' }}
        >
          <span className="w-3.5 h-3.5">{Ico.arrow}</span>
        </span>
      </div>
    </Wrap>
  );
}

// ─── Seção ──────────────────────────────────────────────────────────────────
function Services() {
  const [t, setTweak] = useTweaks(SERVICES_TWEAKS);

  const visible = CATEGORIES.filter(c => t[c.showKey] !== false);

  // Layout
  const gridClass =
    t.layout === 'stack'
      ? 'grid grid-cols-1 gap-6'
      : t.layout === 'carousel'
      ? 'flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6'
      : 'grid grid-cols-1 lg:grid-cols-2 gap-6';

  const itemExtra = t.layout === 'carousel' ? 'snap-center shrink-0 w-[min(86vw,560px)]' : '';

  return (
    <section id="services" className="relative py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <svcMotion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tide/10 border border-tide/20 text-[11px] font-bold tracking-widest uppercase text-tide mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            {t.sectionKicker}
          </div>
          <h2 className="text-[40px] md:text-[64px] font-black hero-letter-spacing leading-[1.02] text-deep-ocean">
            {t.sectionTitle}
            <br />
            <span className="text-driftwood/70">{t.sectionTitleAlt}</span>
          </h2>
          <p className="mt-5 text-driftwood max-w-2xl text-[16px] md:text-[17px] leading-relaxed">
            {t.sectionSubtitle}
          </p>

          {/* Small summary chips */}
          <div className="mt-7 flex flex-wrap gap-2">
            {CATEGORIES.map(c => {
              const active = t[c.showKey] !== false;
              return (
                <button
                  key={c.key}
                  onClick={() => setTweak(c.showKey, !active)}
                  className={`text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${
                    active
                      ? 'border-deep-ocean/20 bg-deep-ocean text-sand'
                      : 'border-horizon bg-white/60 text-driftwood/60 hover:text-deep-ocean'
                  }`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ background: active ? c.accent : 'currentColor' }} />
                  {t[c.titleKey] ?? c.key}
                </button>
              );
            })}
          </div>
        </svcMotion.div>

        {/* Grid */}
        <div className={gridClass}>
          {visible.map((cat, i) => (
            <div key={cat.key} className={itemExtra}>
              <CategoryCard
                cat={cat}
                t={t}
                idx={i}
                density={t.density}
                cardStyle={t.cardStyle}
                showIcons={t.showIcons}
                showNumbers={t.showNumbers}
                animate={t.animate}
              />
            </div>
          ))}
          {visible.length === 0 && (
            <div className="col-span-full text-center py-20 font-mono text-[12px] text-driftwood/60">
              // todas as categorias estão ocultas — ative pelo painel de Tweaks →
            </div>
          )}
        </div>
      </div>

      {/* ─── Tweaks Panel ─────────────────────────────────────────────────── */}
      <TweaksPanel title="Serviços · Tweaks">
        <TweakSection label="Header da seção" />
        <TweakText  label="Kicker"     value={t.sectionKicker}    onChange={v => setTweak('sectionKicker', v)} />
        <TweakText  label="Título 1"   value={t.sectionTitle}     onChange={v => setTweak('sectionTitle', v)} />
        <TweakText  label="Título 2"   value={t.sectionTitleAlt}  onChange={v => setTweak('sectionTitleAlt', v)} />
        <TweakText  label="Subtítulo"  value={t.sectionSubtitle}  onChange={v => setTweak('sectionSubtitle', v)} />

        <TweakSection label="Layout" />
        <TweakRadio  label="Layout"    value={t.layout}    options={['grid','stack','carousel']} onChange={v => setTweak('layout', v)} />
        <TweakRadio  label="Densidade" value={t.density}   options={['compact','comfortable','spacious']} onChange={v => setTweak('density', v)} />
        <TweakRadio  label="Card"      value={t.cardStyle} options={['glass','solid','outline']} onChange={v => setTweak('cardStyle', v)} />
        <TweakToggle label="Mostrar ícones"        value={t.showIcons}   onChange={v => setTweak('showIcons', v)} />
        <TweakToggle label="Mostrar numeração"     value={t.showNumbers} onChange={v => setTweak('showNumbers', v)} />
        <TweakToggle label="Animações de entrada"  value={t.animate}     onChange={v => setTweak('animate', v)} />

        <TweakSection label="Categorias (on/off + renomear)" />
        {CATEGORIES.map(c => (
          <React.Fragment key={c.key}>
            <TweakToggle label={`Exibir · ${c.key}`}   value={t[c.showKey] !== false} onChange={v => setTweak(c.showKey, v)} />
            <TweakText   label={`Título · ${c.key}`}   value={t[c.titleKey]}  onChange={v => setTweak(c.titleKey, v)} />
            <TweakText   label={`Kicker · ${c.key}`}   value={t[c.kickerKey]} onChange={v => setTweak(c.kickerKey, v)} />
          </React.Fragment>
        ))}

        <TweakSection label="Transformação Digital · itens" />
        {CATEGORIES[0].items.map(it => (
          <TweakToggle key={it.key} label={it.title} value={t[it.key] !== false} onChange={v => setTweak(it.key, v)} />
        ))}

        <TweakSection label="Cloud · itens" />
        {CATEGORIES[1].items.map(it => (
          <TweakToggle key={it.key} label={it.title} value={t[it.key] !== false} onChange={v => setTweak(it.key, v)} />
        ))}

        <TweakSection label="Mobile · itens" />
        {CATEGORIES[2].items.map(it => (
          <TweakToggle key={it.key} label={it.title} value={t[it.key] !== false} onChange={v => setTweak(it.key, v)} />
        ))}

        <TweakSection label="Web · itens" />
        {CATEGORIES[3].items.map(it => (
          <TweakToggle key={it.key} label={it.title} value={t[it.key] !== false} onChange={v => setTweak(it.key, v)} />
        ))}
      </TweaksPanel>
    </section>
  );
}

window.Services = Services;
