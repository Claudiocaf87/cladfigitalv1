// Top sections: Navbar, Hero, Pain
const { motion: M1, AnimatePresence: AP1, useScroll: uS1, useTransform: uT1 } = window.Motion;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: scrolled ? 'rgba(14,11,31,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background .4s ease, backdrop-filter .4s ease, border-color .4s ease'
      }}>
      
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src="assets/claf-logo.png" alt="Claf Digital" className="w-10 h-10 rounded-full"
          style={{ boxShadow: '0 0 24px rgba(0,229,255,.25)' }} />
        </a>
        <div className="hidden md:flex items-center gap-10 text-[14px] text-white/55">
          <a key="inicio" href="#top" className="nav-link transition-colors hover:text-white" style={{ fontWeight: "500", color: "rgb(255, 255, 255)" }}>Inicio</a>
          <a key="servicios" href="#soluciones" className="nav-link transition-colors hover:text-white" style={{ color: "rgb(255, 255, 255)" }}>Servicios</a>
          <a key="casos" href="#testimonios" className="nav-link transition-colors hover:text-white" style={{ color: "rgb(255, 255, 255)" }}>Casos</a>
          <a key="contacto" href="#pricing" className="nav-link transition-colors hover:text-white" style={{ color: "rgb(255, 255, 255)" }}>Contacto</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ color: "rgb(255, 23, 68)", border: "1px solid rgb(255, 23, 68)", background: "rgba(255, 255, 255, 0)" }}>
            <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ boxShadow: '0 0 10px #00E676', background: "rgb(255, 23, 68)" }}></span>
            <span className="font-medium text-[12px] text-[#00E676]" style={{ color: "rgb(255, 255, 255)" }}>IA Activa</span>
          </div>
          <motion.a
            href="https://calendly.com/claudiocaf87/consultoria"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg text-white text-[13.5px] font-medium px-5 py-2.5"
            style={{
              background: '#FF1744',
              boxShadow: '0 0 18px rgba(255,23,68,.4), 0 8px 22px -10px rgba(255,23,68,.6)'
            }}>
            Agendar Demo</motion.a>
        </div>
      </div>
    </motion.nav>);
}

function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 160]);
  const videoScale = useTransform(scrollY, [0, 800], [1, 1.08]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 1.15]);

  return (
    <section id="top" data-screen-label="hero" ref={ref}
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Video bg Optimizado por Claf Digital */}
      <motion.div className="absolute -inset-[10%] z-0" style={{ y: videoY, scale: videoScale }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          poster="assets/poster-planeta.jpg"
          className="w-full h-full object-cover"
          style={{ mixBlendMode: 'screen', opacity: 0.78 }}
        >
          {/* Prioridad al WebM de 1.5MB (Ubicado en la raíz para máxima velocidad) */}
          <source src="./planeta.webm" type="video/webm" />
          {/* Backup en assets */}
          <source src="assets/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* fallback radial */}
        <div className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.18) 0%, transparent 70%)' }} />
      </motion.div>

      {/* Overlay radial */}
      <motion.div className="absolute inset-0 z-[1]" style={{ opacity: overlayOpacity }}>
        <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,229,255,0.04) 0%, rgba(14,11,31,0.55) 50%, rgba(14,11,31,0.97) 92%)' }} />
        <div className="absolute inset-x-0 top-0 h-40"
        style={{ background: 'linear-gradient(180deg, rgba(14,11,31,.85), transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(0deg, #0E0B1F, transparent)' }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center text-center px-6 max-w-[1100px] pt-28 pb-32">
        <FadeUp delay={0.15} y={-16} viewport={false}>
          <div className="inline-flex items-center gap-2 rounded-full px-[18px] py-[7px]"
          style={{ border: '1px solid rgba(0,229,255,0.30)', background: 'rgba(0,229,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: '#00E5FF', boxShadow: '0 0 10px #00E5FF' }}></span>
            <span className="font-mono text-[10.5px]" style={{ letterSpacing: '0.28em', color: '#00E5FF' }}>
              AGENCIA IA PARA CLÍNICAS
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.35} y={36} viewport={false} className="mt-8">
          <h1 className="font-display font-extrabold text-white"
          style={{ fontSize: 'clamp(52px, 7vw, 92px)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            <span style={{ color: 'rgba(255,255,255,0.92)' }}>Mientras el mundo gira,</span>
            <br />
            <span className="text-grad-cyan">tus pacientes agendan.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.6} y={20} viewport={false} className="mt-7">
          <p className="font-light text-[18px] md:text-[20px] text-white/90 max-w-[620px] mx-auto"
          style={{ lineHeight: 1.7, opacity: "1", color: "rgb(255, 255, 255)", fontWeight: "400" }}>
            Tu clínica no cierra cuando tú te vas. Implementa inteligencia artificial que
            atiende, califica y agenda <span className="text-cyan-brand font-medium">24/7</span>.
          </p>
        </FadeUp>

        <FadeUp delay={0.85} y={20} viewport={false} className="mt-9">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryCTA href="https://calendly.com/claudiocaf87/consultoria">
              Agendar Demo de Valoración
            </PrimaryCTA>
            <GhostCTA
              icon={<span className="text-cyan-brand">▶</span>}
              onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver en acción
            </GhostCTA>
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={1.1} y={16} viewport={false} className="mt-16 w-full">
          <div className="pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 max-w-[860px] mx-auto">
              {[
              { n: '+340%', l: 'Consultas recuperadas' },
              { n: '24/7', l: 'Sin intervención humana' },
              { n: '<3min', l: 'Tiempo de respuesta IA' },
              { n: '$0', l: 'Leads perdidos de noche' }].
              map((s) =>
              <div key={s.l} className="text-center">
                  <div className="font-mono font-extrabold text-[34px] md:text-[38px] text-cyan-brand"
                style={{ textShadow: '0 0 30px rgba(0,229,255,.45)' }}>{s.n}</div>
                  <div className="mt-1.5 text-[13px] text-white/80" style={{ color: "rgba(255, 255, 255, 0.886)" }}>{s.l}</div>
                </div>
              )}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
        <div className="w-[22px] h-[36px] rounded-full flex items-start justify-center pt-2"
        style={{ border: "1px solid rgb(255, 255, 255)" }}>
          <span className="w-[3px] h-[6px] rounded-full mouse-wheel" style={{ background: "rgb(255, 255, 255)" }}></span>
        </div>
        <span className="font-mono text-[9.5px] text-white/30" style={{ letterSpacing: '.2em', color: "rgb(255, 255, 255)" }}>SCROLL</span>
      </motion.div>
    </section>);
}

function PainSection() {
  const cards = [
  { icon: '🔕', title: 'Consultas ignoradas',
    body: 'El 68% de los pacientes elige al primero que contesta. Mientras tu teléfono suena vacío, tu competencia agenda.' },
  { icon: '📉', title: 'Follow-up inexistente',
    body: 'Sin seguimiento automático, el 40% de los leads calificados se enfrían antes de la primera consulta real.' },
  { icon: '🌙', title: 'Pérdida nocturna de facturación',
    body: 'Tu agenda duerme 8 horas. Tu IA, no. Cada noche sin respuesta es revenue que se va para siempre.' }];

  return (
    <Section id="problema" className="py-32 md:py-36"
    style={{ background: 'linear-gradient(180deg, #0E0B1F 0%, #16122A 100%)' }}>
      <div className="max-w-[640px]">
        <FadeUp><Tag color="#FF1744">EL PROBLEMA REAL</Tag></FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Tu clínica pierde dinero <span className="text-white/40" style={{ color: "rgb(255, 23, 68)" }}>cada vez que</span> no responde.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-5 text-[16.5px] text-white/55 max-w-[500px]" style={{ lineHeight: 1.75, color: "rgb(255, 255, 255)" }}>
            Cada llamada perdida no es solo una llamada. Es un paciente que ya está hablando con otra clínica antes
            de que termines de leer el WhatsApp.
          </p>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
        {cards.map((c, i) =>
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
          className="glass glass-hover-red relative p-10">
          
            <div className="absolute top-6 right-7 font-mono text-[11px] text-white/15 tracking-widest" style={{ color: "rgb(255, 255, 255)" }}>
              0{i + 1} / 03
            </div>
            <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[24px]"
          style={{ background: 'rgba(255,23,68,0.10)', border: '1px solid rgba(255,23,68,0.25)' }}>
              <span>{c.icon}</span>
            </div>
            <h3 className="font-display font-bold text-[22px] text-white mt-7" style={{ letterSpacing: '-0.02em' }}>
              {c.title}
            </h3>
            <p className="mt-3 text-[15px] text-white/55" style={{ lineHeight: 1.7, color: "rgb(255, 255, 255)" }}>
              {c.body}
            </p>
          </motion.div>
        )}
      </div>
    </Section>);
}

Object.assign(window, { Navbar, Hero, PainSection });
