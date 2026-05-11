// Mid: ROI Calculator, Bento Grid, iPhone Simulator

function ROICalculator() {
  const [consultas, setConsultas] = useState(30);
  const [ticket, setTicket] = useState(200);
  const [tasa, setTasa] = useState(65);
  const roi = useMemo(() => Math.round(consultas * ticket * (tasa / 100)), [consultas, ticket, tasa]);
  const ann = roi * 12;

  const Slider = ({ label, value, set, min, max, step, format }) => {
    const pct = (value - min) / (max - min) * 100;
    return (
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2.5">
          <label className="font-medium text-[14px] text-white/60" style={{ color: "rgb(255, 255, 255)" }}>{label}</label>
          <span className="font-mono font-medium text-[16px] text-white">{format ? format(value) : value}</span>
        </div>
        <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="claf-slider"
        style={{ '--p': pct + '%' }} />
      </div>);

  };

  return (
    <Section id="roi" className="py-32 md:py-36" style={{ background: '#16122A' }}>
      <div className="text-center max-w-[760px] mx-auto">
        <FadeUp className="flex justify-center"><Tag>CALCULADORA DE ROI</Tag></FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            ¿Cuánto estás dejando de <span className="text-grad-cyan">ganar cada mes</span>?
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-5 italic font-light text-[17px] text-white/50" style={{ color: "rgb(255, 255, 255)" }}>
            Mové los sliders. Mirá el número. Después hablamos.
          </p>
        </FadeUp>
      </div>

      <FadeUp delay={0.2} className="mt-16">
        <div className="pricing-border max-w-[1000px] mx-auto p-8 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1px_0.9fr] gap-10 md:gap-14 items-stretch">
            {/* Inputs */}
            <div>
              <div className="font-mono text-[11px] text-white/40 mb-6" style={{ letterSpacing: '.22em', color: "rgb(255, 255, 255)" }}>
                01 — TUS NÚMEROS
              </div>
              <Slider label="Consultas perdidas por mes" value={consultas} set={setConsultas}
              min={5} max={300} step={5} format={(v) => v} />
              <Slider label="Ticket promedio por paciente" value={ticket} set={setTicket}
              min={50} max={2000} step={50} format={(v) => '$' + v} />
              <Slider label="Tasa de recuperación IA" value={tasa} set={setTasa}
              min={30} max={85} step={5} format={(v) => v + '%'} />
            </div>

            {/* divider */}
            <div className="hidden md:block w-px" style={{ background: 'rgba(255,255,255,.07)' }}></div>

            {/* Result */}
            <div className="flex flex-col justify-between text-center">
              <div>
                <div className="text-[13px] text-white/45 mb-2" style={{ color: "rgb(255, 255, 255)" }}>Dinero recuperado al mes</div>
                <div className="font-mono font-extrabold text-cyan-brand"
                style={{
                  fontSize: 'clamp(48px, 6vw, 76px)',
                  letterSpacing: '-0.04em',
                  textShadow: '0 0 50px rgba(0,229,255,.55), 0 0 90px rgba(0,229,255,.20)',
                  lineHeight: 1
                }}>
                  {fmt$(roi)}
                </div>
                <div className="mt-5 text-[12.5px] text-white/40 font-mono" style={{ color: "rgb(255, 255, 255)" }}>
                  {consultas} consultas × ${ticket} × {tasa}%
                </div>
                <div className="my-6 h-px" style={{ background: 'rgba(255,255,255,.07)' }}></div>
                <div className="text-[13.5px] text-white/65" style={{ color: "rgb(255, 255, 255)" }}>
                  Al año:{' '}
                  <span className="font-mono font-bold text-white">{fmt$(ann)}</span>
                  <span className="text-white/45" style={{ color: "rgb(255, 255, 255)" }}> recuperados</span>
                </div>
              </div>

              <a href="https://calendly.com/claudiocaf87/consultoria" target="_blank" rel="noopener noreferrer" className="block mt-8 no-underline">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                className="rounded-xl px-6 py-4 text-white font-medium text-[15.5px] cursor-pointer"
                style={{ background: '#FF1744', boxShadow: '0 0 30px rgba(255,23,68,.35), 0 14px 30px -10px rgba(255,23,68,.5)' }}>
                  Quiero recuperar ese dinero →
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </FadeUp>
    </Section>);

}

// Bento Grid
const DEMO_AUDIO_SRC = "assets/demo-voz.mp3"; // drop your demo file here

function VoiceDemoPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [error, setError] = useState(false);

  const fmt = (s) => {
    if (!isFinite(s)) return '00:00';
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const toggle = (e) => {
    e?.stopPropagation?.();
    const a = audioRef.current;
    if (!a) return;
    if (playing) {a.pause();} else
    {
      a.play().then(() => setPlaying(true)).catch(() => setError(true));
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onDur = () => setDur(a.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onErr = () => setError(true);
    const onEnd = () => {setPlaying(false);setTime(0);a.currentTime = 0;};
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onDur);
    a.addEventListener('durationchange', onDur);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('error', onErr);
    a.addEventListener('ended', onEnd);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onDur);
      a.removeEventListener('durationchange', onDur);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('error', onErr);
      a.removeEventListener('ended', onEnd);
    };
  }, []);

  const progress = dur > 0 ? time / dur * 100 : 0;
  const bars = Array.from({ length: 36 });

  return (
    <button
      type="button"
      onClick={toggle}
      className="group w-full text-left rounded-2xl p-5 cursor-pointer transition-colors"
      style={{
        background: 'rgba(0,0,0,.35)',
        border: '1px solid ' + (playing ? 'rgba(0,229,255,.45)' : 'rgba(0,229,255,.18)'),
        boxShadow: playing ? '0 0 32px rgba(0,229,255,.20)' : 'none'
      }}>
      
      <audio ref={audioRef} src={DEMO_AUDIO_SRC} preload="metadata" />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full"
          style={{ background: playing ? '#00E5FF' : '#FF1744',
            boxShadow: '0 0 8px ' + (playing ? '#00E5FF' : '#FF1744'),
            animation: playing ? 'dotPulse 1.4s infinite' : 'none' }}></span>
          <span className="font-mono text-[10.5px] text-white/55" style={{ letterSpacing: '.18em' }}>
            {playing ? 'REPRODUCIENDO' : 'DEMO DE VOZ'}
          </span>
        </div>
        <span className="font-mono text-[10.5px] text-cyan-brand tabular-nums">
          {fmt(time)} / {fmt(dur || 42)}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* play button */}
        <span
          aria-hidden
          className="shrink-0 flex items-center justify-center rounded-full transition-transform group-hover:scale-105"
          style={{
            width: 44, height: 44,
            background: 'linear-gradient(135deg,#00E5FF,#7B8FFF)',
            boxShadow: '0 0 18px rgba(0,229,255,.45)',
            color: '#0E0B1F'
          }}>
          
          {playing ?
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#0E0B1F"><rect x="2" y="1.5" width="3.2" height="11" rx="1" /><rect x="8.8" y="1.5" width="3.2" height="11" rx="1" /></svg> :

          <svg width="14" height="14" viewBox="0 0 14 14" fill="#0E0B1F"><path d="M3 1.5v11l10-5.5z" /></svg>
          }
        </span>

        {/* waveform */}
        <div className="flex-1 flex items-center gap-[4px] h-14 relative">
          {bars.map((_, i) => {
            const active = i / bars.length * 100 < progress;
            const h = 18 + i * 13 % 7 * 5;
            return (
              <span key={i}
              className={playing ? 'wave-bar' : ''}
              style={{
                width: 3,
                height: h + 'px',
                borderRadius: 2,
                background: active ?
                'linear-gradient(180deg, #00E5FF, #7B8FFF)' :
                'rgba(255,255,255,.18)',
                animationDelay: i * 0.06 + 's',
                transition: 'background .25s ease',
                transformOrigin: '50% 50%'
              }} />);

          })}
        </div>
      </div>

      <div className="mt-3 text-[12px] text-white/55 flex items-center gap-2">
        <span className="text-cyan-brand">▶</span>
        {error ?
        <span className="text-white/50">Escucha <code className="font-mono text-white/70">assets/demo-voz.mp3</code></span> :
        <span>{playing ? 'Tocá de nuevo para pausar' : 'Click para escuchar un demo real de la IA'}</span>}
      </div>
    </button>);

}

function Waveform() {
  const bars = Array.from({ length: 28 });
  return (
    <div className="flex items-center justify-center gap-[5px] h-20">
      {bars.map((_, i) =>
      <span key={i} className="wave-bar w-[3px] rounded-full"
      style={{
        height: 16 + i % 6 * 8 + 'px',
        background: 'linear-gradient(180deg, #00E5FF, #7B8FFF)',
        animationDelay: i * 0.07 + 's',
        opacity: 0.85
      }} />
      )}
    </div>);

}

function BentoGrid() {
  return (
    <Section id="soluciones" className="py-32 md:py-36"
    style={{ background: 'linear-gradient(180deg, #16122A 0%, #0E0B1F 100%)' }}>
      <div className="max-w-[640px]">
        <FadeUp><Tag>LA SOLUCIÓN</Tag></FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Todo lo que necesita tu clínica. <span className="text-white/40">Nada que no necesita.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-5 text-[16.5px] text-white/55 max-w-[480px]" style={{ lineHeight: 1.75, color: "rgb(255, 255, 255)" }}>
            Una sola plataforma. Cinco capacidades. Cero fricción.
          </p>
        </FadeUp>
      </div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="mt-16 grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_auto] gap-4">
        
        {/* Card A */}
        <BentoCard className="md:col-span-7 md:row-span-2 p-9 overflow-hidden relative"
        extra={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.07) 0%, rgba(255,255,255,0.04) 60%)' }}>
          <div className="absolute top-7 right-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px]"
            style={{ background: 'rgba(255,23,68,.15)', border: '1px solid rgba(255,23,68,.35)', color: '#FF6688', letterSpacing: '.16em' }}>
              <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: '#FF1744' }}></span>
              ACTIVO 24/7
            </span>
          </div>
          <div className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #00E5FF, #7B8FFF)',
            boxShadow: '0 0 32px rgba(0,229,255,.35)'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M5 9c1.7 0 3 1.3 3 3v3c0 1.7-1.3 3-3 3s-3-1.3-3-3v-3c0-1.7 1.3-3 3-3zM19 9c1.7 0 3 1.3 3 3v3c0 1.7-1.3 3-3 3s-3-1.3-3-3v-3c0-1.7 1.3-3 3-3zM4 9V8a8 8 0 1 1 16 0v1" stroke="#0E0B1F" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="font-display font-bold text-[28px] mt-7" style={{ letterSpacing: '-0.02em' }}>
            Agentes de Voz IA
          </h3>
          <p className="mt-3 text-[15.5px] text-white/55 max-w-[440px]" style={{ lineHeight: 1.7, color: "rgb(255, 255, 255)" }}>
            Conversaciones telefónicas completamente automatizadas. Califica leads, responde preguntas frecuentes,
            agenda y hace seguimiento. Suena como un humano real.
          </p>
          <div className="mt-8">
            <VoiceDemoPlayer />
          </div>
        </BentoCard>

        {/* Card B */}
        <BentoCard className="md:col-span-5 p-9 relative">
          <div className="flex items-start justify-between">
            <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center overflow-hidden"
            style={{ width: "56px", backgroundImage: "initial", backgroundPosition: "initial", backgroundSize: "initial", backgroundRepeat: "initial", backgroundAttachment: "initial", backgroundOrigin: "initial", backgroundClip: "initial", borderStyle: "solid", borderColor: "rgba(0, 230, 118, 0.3)", borderImage: "initial", borderWidth: "2px 2px 2px 1px", background: "rgb(0, 92, 75)", border: "2px solid rgb(255, 255, 255)" }}>
              <img src="assets/whatsapp.png" alt="WhatsApp" width="36" height="36" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            </div>
            <span className="font-mono text-[10px] text-white/30" style={{ letterSpacing: '.2em' }}></span>
          </div>
          <h3 className="font-display font-bold text-[22px] mt-6" style={{ letterSpacing: '-0.02em' }}>
            WhatsApp Automation
          </h3>
          <p className="mt-2 text-[14.5px] text-white/55" style={{ lineHeight: 1.65, color: "rgb(255, 255, 255)" }}>
            Conversaciones inteligentes que convierten chats en pacientes agendados.
          </p>
          {/* mini chat */}
          <div className="mt-5 space-y-1.5">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm px-3 py-2 text-[12px] text-white/85"
            style={{ background: '#1F2C34' }}>
              ¡Hola! ¿En qué puedo ayudarte?
            </div>
            <div className="max-w-[60%] ml-auto rounded-2xl rounded-tr-sm px-3 py-2 text-[12px] text-white/95"
            style={{ background: '#005C4B' }}>
              Quiero agendar
            </div>
          </div>
          <a href="#" className="inline-flex items-center gap-1.5 mt-5 text-[12.5px] font-medium text-cyan-brand">
            Ver demo <span>→</span>
          </a>
        </BentoCard>

        {/* Card C */}
        <BentoCard className="md:col-span-5 p-9 relative">
          <div className="flex items-start justify-between">
            <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(0,229,255,.08)', border: '1px solid rgba(0,229,255,.25)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="16" rx="3" />
                <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
                <rect x="7" y="12" width="3" height="3" rx=".5" fill="#00E5FF" />
              </svg>
            </div>
            <span className="font-mono text-[10px] text-white/30" style={{ letterSpacing: '.2em' }}></span>
          </div>
          <h3 className="font-display font-bold text-[22px] mt-6" style={{ letterSpacing: '-0.02em' }}>
            Agendamiento Directo
          </h3>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-mono font-extrabold text-[44px] text-white" style={{ letterSpacing: '-.04em' }}>0</span>
            <span className="text-[13px] text-white/55" style={{ color: "rgb(255, 255, 255)" }}>llamadas de coordinación</span>
          </div>
          <p className="mt-2 text-[14px] text-white/50" style={{ lineHeight: 1.65, color: "rgb(255, 255, 255)" }}>
            El paciente elige, el sistema confirma. Sin idas y vueltas.
          </p>
        </BentoCard>

        {/* Card D */}
        <BentoCard className="md:col-span-4 md:row-span-2 p-9 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(123,143,255,.10)', border: '1px solid rgba(123,143,255,.25)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7B8FFF" strokeWidth="1.6">
                <path d="M3 21V11M9 21V7M15 21V13M21 21V4" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-mono text-[10px] text-white/30" style={{ letterSpacing: '.2em' }}></span>
          </div>
          <h3 className="font-display font-bold text-[22px] mt-6" style={{ letterSpacing: '-0.02em' }}>
            Dashboard de Métricas
          </h3>
          {/* Mini chart */}
          <div className="mt-7 flex items-end gap-2.5 h-[120px]">
            {[26, 38, 32, 60, 92].map((h, i) =>
            <motion.div key={i}
            initial={{ height: 0 }}
            whileInView={{ height: h + '%' }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EASE }}
            viewport={{ once: true }}
            className="flex-1 rounded-t-md"
            style={{
              background: i === 4 ?
              'linear-gradient(180deg, #00E5FF, rgba(0,229,255,.25))' :
              'linear-gradient(180deg, rgba(0,229,255,.55), rgba(0,229,255,.10))',
              boxShadow: i === 4 ? '0 0 22px rgba(0,229,255,.45)' : 'none'
            }} />
            )}
          </div>
          <div className="mt-7">
            <div className="font-mono font-extrabold text-cyan-brand"
            style={{ fontSize: 56, letterSpacing: '-0.04em', textShadow: '0 0 36px rgba(0,229,255,.45)' }}>
              <AnimatedNumber value={340} prefix="+" suffix="%" />
            </div>
            <div className="text-[13px] text-white/50" style={{ color: "rgb(255, 255, 255)" }}>Promedio de conversión con IA</div>
          </div>
        </BentoCard>

        {/* Card E */}
        <BentoCard className="md:col-span-8 p-9 relative">
          <div className="flex items-start justify-between">
            <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(0,229,255,.08)', border: '1px solid rgba(0,229,255,.25)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.6">
                <path d="M21 12a9 9 0 1 1-3-6.7" strokeLinecap="round" />
                <path d="M21 4v5h-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[10px] text-white/30" style={{ letterSpacing: '.2em' }}></span>
          </div>
          <h3 className="font-display font-bold text-[22px] mt-6" style={{ letterSpacing: '-0.02em' }}>
            Follow-up Automático
          </h3>
          <p className="mt-2 text-[14.5px] text-white/55 max-w-[480px]" style={{ lineHeight: 1.65, color: "rgb(255, 255, 255)" }}>
            Secuencias de seguimiento que no requieren intervención humana.
          </p>
          {/* Timeline */}
          <div className="mt-8 flex items-center justify-between gap-3 max-w-[640px]">
            {['Primer mensaje', 'Recordatorio 48h', 'Cierre & confirmación'].map((s, i) =>
            <React.Fragment key={s}>
                <div className="flex flex-col items-center text-center" style={{ flex: '0 0 auto' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[12px] font-bold text-cyan-brand"
                style={{ background: 'rgba(0,229,255,.10)', border: '1px solid rgba(0,229,255,.40)', boxShadow: '0 0 18px rgba(0,229,255,.25)' }}>
                    {i + 1}
                  </div>
                  <div className="text-[11.5px] text-white/65 mt-2 max-w-[110px]" style={{ color: "rgb(255, 255, 255)" }}>{s}</div>
                </div>
                {i < 2 &&
              <div className="flex-1 h-px relative" style={{ background: 'linear-gradient(90deg, rgba(0,229,255,.45), rgba(0,229,255,.10))' }}>
                  </div>
              }
              </React.Fragment>
            )}
          </div>
        </BentoCard>
      </motion.div>
    </Section>);

}

function BentoCard({ children, className = "", extra = {} }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
      className={"glass glass-hover-cyan " + className}
      style={extra}>
      
      {children}
    </motion.div>);

}

Object.assign(window, { ROICalculator, BentoGrid, Waveform, VoiceDemoPlayer });