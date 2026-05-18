import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { InteractiveBackground } from './background';
import { Nav } from './nav';
import { Hero } from './hero';
import { Showcase } from './showcase';
import { HowItWorks } from './how-it-works';
import { SprintOffer } from './services';
import { ClientFilter } from './client-filter';
import { Footer } from './footer';
import { QuoteModal } from './form-modal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.openQuoteForm = () => setModalOpen(true);
    return () => { delete window.openQuoteForm; };
  }, []);

  return (
    <>
      <InteractiveBackground />
      <Nav />
      <main className="relative">
        <Hero />
        <Showcase />
        <HowItWorks />
        <SprintOffer />
        <ClientFilter />
        <Footer />
      </main>
      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
