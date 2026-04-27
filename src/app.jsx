// Main app — composes all sections
const { motion: appMotion } = window.framerMotion || window.Motion || window.FramerMotion;

function Footer() {
  return (
    <footer className="relative border-t border-zinc-200/60 py-16 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-miro-blue to-[#8a9cff] rounded-[10px] flex items-center justify-center text-white font-black text-lg">S</div>
              <span className="font-bold text-[17px] tracking-tight">SMK <span className="text-miro-blue">RssN</span></span>
            </div>
            <p className="text-zinc-500 text-[14px] max-w-md leading-relaxed">
              Engenharia colaborativa para agentes autônomos, automações massivas e produtos de software com feedback visual em tempo real.
            </p>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">Serviços</div>
            <ul className="space-y-2 text-[14px] text-zinc-600">
              <li className="hover:text-miro-blue cursor-pointer transition-colors">Transformação Digital</li>
              <li className="hover:text-miro-blue cursor-pointer transition-colors">Cloud</li>
              <li className="hover:text-miro-blue cursor-pointer transition-colors">Mobile</li>
              <li className="hover:text-miro-blue cursor-pointer transition-colors">Web</li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">Company</div>
            <ul className="space-y-2 text-[14px] text-zinc-600">
              <li className="hover:text-miro-blue cursor-pointer transition-colors">Manifesto</li>
              <li className="hover:text-miro-blue cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-miro-blue cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-200/60">
          <div className="text-[12px] text-zinc-400 font-mono">© 2026 SMK RssN · Engineered for autonomy.</div>
          <div className="flex gap-2">
            {['Status', 'Privacy', 'Terms'].map(x => (
              <span key={x} className="text-[12px] text-zinc-500 hover:text-miro-blue cursor-pointer transition-colors px-2">{x}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <InteractiveBackground />
      <Nav />
      <main className="relative">
        <Hero />
        <Workflow />
        <Services />
        <Footer />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
