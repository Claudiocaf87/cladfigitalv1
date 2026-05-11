// End sections: iPhone Simulator, Testimonials, Pricing, Footer

function PhoneSimulator() {
  // phase: 'idle' | 'calling' | 'chat'
  const [phase, setPhase] = useState('idle');
  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  const messages = [
  { who: 'bot', text: '¡Hola! 👋 Soy el asistente de tu clínica. ¿En qué puedo ayudarte hoy?' },
  { who: 'user', text: 'Quiero saber cuánto cuesta' },
  { who: 'bot', text: 'Con gusto 😊 Nuestros planes arrancan en $497/mes con todo incluido. ¿Querés que te cuente qué incluye o preferís agendar una demo gratuita de 20 min?' },
  { who: 'user', text: 'Demo, mejor' },
  { who: 'bot', text: 'Perfecto 🗓 Te mando el link ahora mismo. ¿A qué nombre quedó la demo?' }];


  // chat schedule when phase becomes chat
  useEffect(() => {
    if (phase !== 'chat') return;
    setVisible([]);
    setTyping(false);
    const timers = [];
    // schedule each message
    const schedule = [
    { t: 400, action: () => setVisible((v) => [...v, 0]) },
    { t: 1500, action: () => setTyping(true) },
    { t: 2700, action: () => {setTyping(false);setVisible((v) => [...v, 1]);} },
    { t: 3500, action: () => setTyping(true) },
    { t: 5100, action: () => {setTyping(false);setVisible((v) => [...v, 2]);} },
    { t: 6900, action: () => setVisible((v) => [...v, 3]) },
    { t: 7700, action: () => setTyping(true) },
    { t: 9100, action: () => {setTyping(false);setVisible((v) => [...v, 4]);} }];

    schedule.forEach((s) => timers.push(setTimeout(s.action, s.t)));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [visible, typing]);

  const startCall = () => setPhase('calling');
  const acceptCall = () => setPhase('chat');
  const reset = () => setPhase('idle');

  return (
    <Section id="simulador" className="py-32 md:py-36" style={{ background: '#0E0B1F' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* LEFT */}
        <div>
          <FadeUp><Tag>SIMULADOR EN VIVO</Tag></FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Así suena un paciente <br />
              <span className="text-grad-cyan">atendido por IA.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-5 text-[17px] text-white/60 max-w-[480px]" style={{ lineHeight: 1.7, color: "rgb(255, 255, 255)" }}>
              En menos de 3 segundos, tu asistente contesta, califica y agenda. Completamente solo.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <ul className="mt-8 space-y-4 max-w-[460px]">
              {[
              'Responde en menos de 3 segundos',
              'Detecta urgencia y escala si es necesario',
              'Califica al lead con preguntas naturales',
              'Agenda directo en tu calendario'].
              map((b) =>
              <li key={b} className="flex items-start gap-3 text-[15.5px] text-white/80">
                  <span className="mt-0.5"><CheckCyan /></span>
                  <span style={{ color: "rgb(255, 255, 255)" }}>{b}</span>
                </li>
              )}
            </ul>
          </FadeUp>

          <FadeUp delay={0.35} className="mt-10">
            <motion.button
              onClick={phase === 'idle' ? startCall : reset}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-xl px-7 py-4 text-[15px] font-medium"
              style={{
                background: 'rgba(0,229,255,.06)',
                border: '1px solid rgba(0,229,255,.45)',
                color: '#fff',
                boxShadow: '0 0 28px rgba(0,229,255,.18)'
              }}>
              
              <span className="text-cyan-brand">{phase === 'idle' ? '▶' : '↺'}</span>
              {phase === 'idle' ? 'Ver la simulación' : 'Reiniciar simulación'}
            </motion.button>
          </FadeUp>
        </div>

        {/* RIGHT - Phone */}
        <FadeUp delay={0.2} className="flex justify-center">
          <div className="relative">
            {/* glow behind phone */}
            <div className="absolute -inset-10 rounded-[80px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,255,.16), transparent 65%)' }}></div>

            <div className="relative" style={{
              width: 320,
              padding: 14,
              borderRadius: 56,
              background: 'linear-gradient(145deg, #2A2A2E, #1A1A1E)',
              boxShadow: '0 0 0 1px rgba(255,255,255,.10), 0 40px 80px rgba(0,0,0,.6), inset 0 0 0 1px rgba(255,255,255,.04)', color: "rgb(255, 255, 255)"
            }}>
              {/* Dynamic island */}
              <div className="mx-auto mb-3 relative flex items-center justify-center"
              style={{ width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 5 }}>
                {phase === 'calling' &&
                <span className="w-2 h-2 rounded-full dot-pulse"
                style={{ background: '#00E676', boxShadow: '0 0 10px #00E676' }}></span>
                }
                {phase === 'chat' &&
                <div className="flex items-center gap-1.5 text-[10px] text-white/70 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#25D366' }}></span>
                    en chat
                  </div>
                }
              </div>

              {/* Screen */}
              <div className="relative overflow-hidden"
              style={{
                background: '#080810',
                borderRadius: 42,
                minHeight: 540
              }}>
                <AnimatePresence mode="wait" initial={false}>
                  {phase !== 'chat' &&
                  <motion.div key="call"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center pt-12 pb-7 px-6"
                  style={{ background: 'radial-gradient(ellipse at top, #1A0A30 0%, #080810 60%)' }}>

                      <div className="font-mono text-[10px] text-white/40 mb-6" style={{ letterSpacing: '.22em', color: "rgb(255, 255, 255)" }}>
                        LLAMADA ENTRANTE
                      </div>

                      {/* Avatar with ripples */}
                      <div className="relative">
                        {phase === 'calling' &&
                      <>
                            <span className="absolute inset-0 rounded-full ring-ripple"
                        style={{ border: '2px solid rgba(0,229,255,.45)', animationDelay: '0s' }}></span>
                            <span className="absolute inset-0 rounded-full ring-ripple"
                        style={{ border: '2px solid rgba(0,229,255,.35)', animationDelay: '0.6s' }}></span>
                            <span className="absolute inset-0 rounded-full ring-ripple"
                        style={{ border: '2px solid rgba(0,229,255,.25)', animationDelay: '1.2s' }}></span>
                          </>
                      }
                        <div className="relative w-[88px] h-[88px] rounded-full flex items-center justify-center text-[36px]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,229,255,.30), rgba(123,143,255,.30))',
                        border: '2px solid rgba(0,229,255,.50)',
                        boxShadow: '0 0 30px rgba(0,229,255,.35)'
                      }}>
                          🤖
                        </div>
                      </div>

                      <div className="font-display font-bold text-[18px] text-white mt-6">Asistente IA</div>
                      <div className="text-[13px] text-white/50 mt-1" style={{ color: "rgb(255, 255, 255)" }}>
                        {phase === 'idle' ? 'Toca para simular' :
                      <>Llamada entrante
                            <span className="typing-dot">.</span>
                            <span className="typing-dot" style={{ animationDelay: '.2s' }}>.</span>
                            <span className="typing-dot" style={{ animationDelay: '.4s' }}>.</span>
                          </>
                      }
                      </div>

                      <div className="mt-auto flex items-center gap-12">
                        <motion.button
                        onClick={reset}
                        animate={phase === 'calling' ? { rotate: [-6, 6, -6, 6, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', repeatDelay: .6 }}
                        className="w-[64px] h-[64px] rounded-full flex items-center justify-center text-[24px] text-white"
                        style={{ background: '#FF1744', boxShadow: '0 0 24px rgba(255,23,68,.5)' }}>
                        
                          📵
                        </motion.button>
                        <motion.button
                        onClick={acceptCall}
                        animate={phase === 'calling' ? { scale: [1, 1.08, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                        className="w-[64px] h-[64px] rounded-full flex items-center justify-center text-[24px]"
                        style={{ background: '#00E676', boxShadow: '0 0 24px rgba(0,230,118,.55)' }}>
                        
                          📞
                        </motion.button>
                      </div>

                      {phase === 'idle' &&
                    <button onClick={startCall}
                    className="mt-4 font-mono text-[10px] text-cyan-brand"
                    style={{ letterSpacing: '.18em' }}>▶ TOCA PARA INICIAR

                    </button>
                    }
                    </motion.div>
                  }

                  {phase === 'chat' &&
                  <motion.div key="chat"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col">

                      {/* Header */}
                      <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#075E54' }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[16px]"
                      style={{ background: 'linear-gradient(135deg,#00E5FF,#7B8FFF)' }}>🤖</div>
                        <div className="flex-1">
                          <div className="font-display font-bold text-[14px] text-white">Asistente IA</div>
                          <div className="text-[11px] flex items-center gap-1.5" style={{ color: '#A6E5C2' }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#25D366' }}></span>
                            en línea
                          </div>
                        </div>
                        <div className="text-white/70 text-[18px]">⋮</div>
                      </div>

                      {/* Messages */}
                      <div ref={chatRef} className="flex-1 overflow-y-auto px-3 py-4 wa-bg space-y-2 no-scrollbar">
                        {messages.filter((_, idx) => visible.includes(idx)).map((m, idx) =>
                      <motion.div key={idx}
                      initial={{ opacity: 0, y: 8, scale: .96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={"flex " + (m.who === 'user' ? 'justify-end' : 'justify-start')}>
                            <div className={"max-w-[78%] px-3 py-2 text-[13px] text-white/95 " + (
                        m.who === 'user' ?
                        'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl' :
                        'rounded-tr-2xl rounded-bl-2xl rounded-br-2xl')}
                        style={{
                          background: m.who === 'user' ? '#005C4B' : '#1F2C34',
                          lineHeight: 1.45
                        }}>
                              {m.text}
                              <div className="text-[9px] text-white/45 mt-1 text-right">
                                {m.who === 'user' ? '12:0' + (3 + idx) + ' ✓✓' : '12:0' + (2 + idx)}
                              </div>
                            </div>
                          </motion.div>
                      )}
                        {typing &&
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="px-3 py-2 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
                        style={{ background: '#1F2C34' }}>
                              <span className="inline-flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/60 typing-dot"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/60 typing-dot" style={{ animationDelay: '.2s' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/60 typing-dot" style={{ animationDelay: '.4s' }}></span>
                              </span>
                            </div>
                          </motion.div>
                      }
                      </div>

                      {/* Input */}
                      <div className="px-3 py-3 flex items-center gap-2"
                    style={{ background: '#1F2C34', borderTop: '1px solid rgba(255,255,255,.06)' }}>
                        <div className="flex-1 rounded-full px-4 py-2 text-[12.5px] text-white/35"
                      style={{ background: '#2A3942' }}>
                          Escribe un mensaje...
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[14px]"
                      style={{ background: '#00A884' }}>🎤</div>
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </Section>);

}

function Testimonials() {
  const testis = [
  { n: 'Dra. María Fernández', r: 'Directora, Clínica Estética Lumina',
    q: 'En 30 días recuperamos 47 consultas nocturnas. El sistema funciona completamente solo. ROI el primer mes.', g: ['#00E5FF', '#7B8FFF'] },
  { n: 'Dr. Alejandro Torres', r: 'CEO, Centro Médico Vitaliza',
    q: 'El 80% de los agendamientos ahora los maneja la IA. Mi equipo se concentra en lo que importa: el paciente.', g: ['#FF1744', '#FF6B9A'] },
  { n: 'Lic. Carolina Méndez', r: 'Gerente, Dental Sonrisa+',
    q: 'Setup una tarde, resultados desde el día siguiente. Nunca imaginé que fuera tan fácil y tan rentable.', g: ['#7B8FFF', '#00E5FF'] },
  { n: 'Dr. Roberto Lima', r: 'Director, Clínica NovaMed',
    q: 'Antes perdíamos 20-30 leads por semana sin saberlo. Ahora cada consulta queda registrada y seguida.', g: ['#00E676', '#00E5FF'] },
  { n: 'Mg. Patricia Ruiz', r: 'CEO, Fisioterapia Activa',
    q: 'El agente de voz es indistinguible de un humano real. Nuestros pacientes no saben que hablan con IA.', g: ['#FFD600', '#FF8A00'] },
  { n: 'Dr. Sebastián Mora', r: 'Director, Centro Derma+',
    q: 'Triplicamos los agendamientos online en 45 días. La inversión se pagó sola en la primera semana.', g: ['#FF6688', '#7B8FFF'] }];

  const row1 = testis.slice(0, 3);
  const row2 = testis.slice(3);

  const Card = ({ t }) =>
  <div className="glass shrink-0 p-8" style={{ width: 360 }}>
      <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div>
      <p className="my-5 text-[15px] text-white/75 font-light" style={{ lineHeight: 1.7 }}>
        "{t.q}"
      </p>
      <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-[14px] text-white/90"
      style={{ background: 'linear-gradient(135deg, ' + t.g[0] + ', ' + t.g[1] + ')' }}>
          {t.n.split(' ').slice(-2).map((w) => w[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-[14px] text-white">{t.n}</div>
          <div className="text-[12px] text-white/45">{t.r}</div>
        </div>
      </div>
    </div>;


  const Row = ({ items, dir = 'l' }) =>
  <div className="overflow-hidden marquee-pause" style={{
    maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
    WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'
  }}>
      <div className={"flex gap-5 w-max " + (dir === 'l' ? 'marquee-track-l' : 'marquee-track-r')}>
        {[...items, ...items, ...items].map((t, i) => <Card key={t.n + '-' + i} t={t} />)}
      </div>
    </div>;


  return (
    <Section id="testimonios" className="py-32 md:py-36"
    style={{ background: 'linear-gradient(180deg,#0E0B1F 0%, #16122A 50%, #0E0B1F 100%)' }}>
      <div className="text-center max-w-[760px] mx-auto">
        <FadeUp className="flex justify-center"><Tag>RESULTADOS REALES</Tag></FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Clínicas que <span className="text-grad-cyan">ya no pierden</span> pacientes.
          </h2>
        </FadeUp>
      </div>

      <div className="mt-14 space-y-5">
        <Row items={row1} dir="l" />
        <Row items={row2} dir="r" />
      </div>
    </Section>);

}

function Pricing() {
  const features = [
  'Agente de Voz IA — llamadas ilimitadas',
  'WhatsApp Automation 24/7',
  'Agendamiento directo en tu calendario',
  'Dashboard de métricas en tiempo real',
  'Integración con tu CRM existente',
  'Setup y configuración incluidos',
  'Soporte prioritario por WhatsApp',
  'Garantía de resultados en 30 días'];

  return (
    <Section id="pricing" className="py-32 md:py-36" style={{ background: '#0E0B1F' }}>
      <div className="text-center max-w-[600px] mx-auto">
        <FadeUp className="flex justify-center"><Tag>INVERSIÓN</Tag></FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Un precio. <span className="text-grad-cyan">Todo incluido.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-5 text-[17px] text-white/55" style={{ color: "rgb(255, 255, 255)" }}>
            Sin sorpresas. Sin contratos. Sin letra chica.
          </p>
        </FadeUp>
      </div>

      <FadeUp delay={0.25}>
        <div className="pricing-border max-w-[560px] mx-auto p-10 md:p-14 mt-20 relative">
          {/* Floating badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-white"
          style={{
            background: '#FF1744',
            boxShadow: '0 0 24px rgba(255,23,68,.45), 0 8px 22px -8px rgba(255,23,68,.55)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10.5,
            letterSpacing: '.16em',
            fontWeight: 500
          }}>
            OFERTA LIMITADA — SOLO 5 CUPOS ESTE MES
          </div>

          <div className="text-center">
            <div className="font-light text-[18px] text-white/30 line-through" style={{ color: "rgb(255, 255, 255)" }}>US$797</div>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="font-light text-[28px] text-white/55" style={{ color: "rgb(255, 255, 255)" }}>US$</span>
              <span className="font-mono font-extrabold text-white" style={{ fontSize: 88, letterSpacing: '-.05em', lineHeight: 1 }}>497</span>
              <span className="font-light text-[20px] text-white/45 ml-1" style={{ color: "rgb(255, 255, 255)" }}>/ mes</span>
            </div>
            <div className="mt-3 text-[13px] text-white/45" style={{ color: "rgb(255, 255, 255)" }}>
              Sin contrato de permanencia · Cancela cuando quieras
            </div>
          </div>

          <div className="my-9 h-px" style={{ background: 'rgba(255,255,255,.07)' }}></div>

          <ul className="space-y-3.5">
            {features.map((f) =>
            <li key={f} className="flex items-start gap-3 text-[14.5px] text-white/80">
                <span className="text-cyan-brand font-mono mt-0.5">✦</span>
                <span style={{ color: "rgb(255, 255, 255)" }}>{f}</span>
              </li>
            )}
          </ul>

          <motion.a
            href="https://calendly.com/claudiocaf87/consultoria"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}
            className="mt-9 w-full rounded-2xl py-5 text-white font-semibold text-[16.5px] pulse-red text-center block no-underline"
            style={{
              background: '#FF1744',
              boxShadow: '0 0 30px rgba(255,23,68,.4), 0 18px 40px -10px rgba(255,23,68,.5)'
            }}>
            Agendar Mi Demo Gratuita →
          </motion.a>

          <p className="mt-4 text-center text-[12px] text-white/35" style={{ color: "rgb(255, 255, 255)" }}>
            Sin compromiso. La demo incluye auditoría gratuita de tu clínica.
          </p>
        </div>
      </FadeUp>
    </Section>);

}

function Footer() {
  return (
    <footer style={{ background: '#0E0B1F', borderTop: '1px solid rgba(255,255,255,.07)' }}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="assets/claf-logo.png" alt="Claf Digital" className="w-9 h-9 rounded-full" />
        </div>
        <div className="text-[13px] text-white/30 text-center">
          © 2026 Claf Digital · IA para Clínicas
        </div>
        <a href="mailto:hola@clafdigital.com"
        className="text-[13px] transition-colors"
        style={{ color: 'rgba(0,229,255,.7)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#00E5FF'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,229,255,.7)'}>
          hola@clafdigital.com
        </a>
      </div>
    </footer>);

}

Object.assign(window, { PhoneSimulator, Testimonials, Pricing, Footer });