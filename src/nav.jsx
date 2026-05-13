const { motion: navMotion } = window.framerMotion || window.Motion || window.FramerMotion;

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <navMotion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
        scrolled ? 'bg-sand/75 backdrop-blur-xl border-b border-horizon/70' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-10">
        <a href="#hero" className="flex items-center gap-2.5 no-underline">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-tide rounded-[10px] rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-tide to-foam rounded-[10px] flex items-center justify-center text-sand font-black text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_rgba(8,145,166,0.35)]">
              1
            </div>
          </div>
          <span className="font-bold text-[17px] tracking-tight text-deep-ocean">
            1<span className="text-tide">Bitpi</span>
          </span>
        </a>
        <div className="hidden lg:flex gap-7 font-medium text-[14px] text-driftwood">
          {[
            { label: 'Como Funciona', href: '#como-funciona' },
            { label: 'A Oferta',      href: '#a-oferta' },
            { label: 'Para Quem',     href: '#para-quem' },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="relative group no-underline">
              <span className="group-hover:text-deep-ocean transition-colors">{label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-tide group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <navMotion.a
          href="#booking"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative bg-deep-ocean text-sand px-5 py-2.5 rounded-xl font-semibold text-[14px] overflow-hidden group no-underline inline-flex items-center gap-1.5"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            Pedir Orçamento
            <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-tide to-foam opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </navMotion.a>
      </div>
    </navMotion.nav>
  );
}

window.Nav = Nav;
