function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PainSection />
      <ROICalculator />
      <BentoGrid />
      <PhoneSimulator />
      <Testimonials />
      <Pricing />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
