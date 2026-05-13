const { motion: fmMotion, AnimatePresence: FMPresence } = window.framerMotion || window.Motion || window.FramerMotion;

// Substitua pela URL do seu formulário no Formspree (formspree.io)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdojlez';

const PROJECT_TYPES = [
  'Site Institucional',
  'Website',
  'Webapp',
  'App Mobile',
  'Não tenho certeza ainda',
];

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl border border-horizon bg-white/60 text-deep-ocean text-[14px] placeholder-driftwood/50 focus:outline-none focus:border-tide focus:ring-2 focus:ring-tide/20 transition-colors';

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-deep-ocean mb-1.5 uppercase tracking-widest">
        {label} {required && <span className="text-tide">*</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessScreen({ onClose }) {
  return (
    <div className="p-10 text-center">
      <div className="w-16 h-16 rounded-full bg-seaglass flex items-center justify-center mx-auto mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-tide-pressed">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h3 className="text-[22px] font-black text-deep-ocean mb-2">Formulário enviado!</h3>
      <p className="text-driftwood text-[14px] leading-relaxed max-w-xs mx-auto mb-7">
        Recebi seu formulário e retorno em até 24 horas com os próximos passos.
      </p>
      <button
        onClick={onClose}
        className="px-7 py-3 rounded-xl bg-deep-ocean text-sand font-semibold text-[14px] hover:bg-tide transition-colors"
      >
        Fechar
      </button>
    </div>
  );
}

function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = React.useState({
    name: '', email: '', whatsapp: '', company: '',
    projectType: '', description: '', source: '',
  });
  const [status, setStatus] = React.useState('idle'); // idle | sending | success | error

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `[1Bitpi] Orçamento — ${form.projectType || 'Projeto'} — ${form.name}`,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  function handleClose() {
    setForm({ name: '', email: '', whatsapp: '', company: '', projectType: '', description: '', source: '' });
    setStatus('idle');
    onClose();
  }

  return (
    <FMPresence>
      {isOpen && (
        <fmMotion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,22,43,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <fmMotion.div
            key="panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-[28px] w-full max-w-lg max-h-[92vh] overflow-y-auto"
          >
            {status === 'success' ? (
              <SuccessScreen onClose={handleClose} />
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between px-8 pt-8 pb-2">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tide/10 border border-tide/20 text-[11px] font-bold tracking-widest uppercase text-tide mb-3">
                      Pedir Orçamento
                    </div>
                    <h2 className="text-[22px] font-black text-deep-ocean hero-letter-spacing">
                      Conta sobre seu projeto
                    </h2>
                    <p className="text-[13px] text-driftwood mt-1">
                      Retornamos em até 24 horas com os próximos passos.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-1 w-8 h-8 rounded-full bg-deep-ocean/5 flex items-center justify-center text-driftwood hover:bg-deep-ocean/10 transition-colors shrink-0 ml-4"
                    aria-label="Fechar"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 pb-8 pt-5 space-y-4">
                  <Field label="Nome completo" required>
                    <input name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Seu nome" className={INPUT_CLASS} />
                  </Field>

                  <Field label="Email" required>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" className={INPUT_CLASS} />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="WhatsApp">
                      <input name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} placeholder="(11) 99999-9999" className={INPUT_CLASS} />
                    </Field>
                    <Field label="Empresa">
                      <input name="company" type="text" value={form.company} onChange={handleChange} placeholder="Opcional" className={INPUT_CLASS} />
                    </Field>
                  </div>

                  <Field label="Tipo de projeto" required>
                    <select name="projectType" value={form.projectType} onChange={handleChange} required className={INPUT_CLASS}>
                      <option value="">Selecione...</option>
                      {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Descreva brevemente o projeto" required>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="O que você precisa? Qual problema quer resolver? Tem alguma referência?"
                      className={INPUT_CLASS + ' resize-none'}
                    />
                  </Field>

                  <Field label="Como nos encontrou?">
                    <select name="source" value={form.source} onChange={handleChange} className={INPUT_CLASS}>
                      <option value="">Selecione...</option>
                      <option value="Google">Google</option>
                      <option value="Indicação">Indicação</option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </Field>

                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-shell border border-coral/20 text-[13px] text-coral flex items-start gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                      </svg>
                      Algo deu errado. Tente novamente ou entre em contato via WhatsApp.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative w-full bg-deep-ocean text-sand px-6 py-4 rounded-xl font-bold text-[15px] overflow-hidden flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {status === 'sending' ? 'Enviando…' : 'Enviar'}
                      {status !== 'sending' && (
                        <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-tide to-foam translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </button>

                  <p className="text-center text-[11px] text-driftwood/50">
                    Seus dados são confidenciais. Respondemos em até 24h.
                  </p>
                </form>
              </>
            )}
          </fmMotion.div>
        </fmMotion.div>
      )}
    </FMPresence>
  );
}

window.QuoteModal = QuoteModal;
