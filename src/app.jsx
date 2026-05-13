function App() {
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
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

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
