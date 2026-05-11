// Shared primitives & helpers
const { useState, useEffect, useRef, useMemo, useCallback } = React;
const { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } = window.Motion || {};

const EASE = [0.16, 1, 0.3, 1];

// Section wrapper
function Section({ id, children, className = "", style = {} }) {
  return (
    <section id={id} data-screen-label={id} className={"relative " + className} style={style}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        {children}
      </div>
    </section>);

}

// Eyebrow tag
function Tag({ children, color = "#00E5FF" }) {
  return (
    <div className="inline-flex items-center font-mono text-[11px] uppercase mb-4"
    style={{ ...{ letterSpacing: '0.22em', color, fontWeight: "500" }, color: "rgb(255, 23, 68)", fontSize: "18px", fontWeight: "900" }}>
      <span className="w-6 h-px mr-3" style={{ ...{ background: color, opacity: .55, fontWeight: "800" }, background: "rgb(255, 23, 68)", opacity: "1", height: "2px" }}></span>
      {children}
    </div>);

}

// Animated number that counts to value when in view
function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1500, format = (n) => n.toLocaleString('en-US') }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return <span ref={ref}>{prefix}{format(display)}{suffix}</span>;
}

// FadeUp wrapper
function FadeUp({ children, delay = 0, y = 30, className = "", as: As = motion.div, once = true, viewport = true }) {
  const props = viewport ?
  { initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once, margin: "-10%" }, transition: { duration: 0.85, delay, ease: EASE } } :
  { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.85, delay, ease: EASE } };
  return <As className={className} {...props}>{children}</As>;
}

// Cyan check icon
function CheckCyan({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="11" stroke="rgba(0,229,255,.35)" strokeWidth="1" />
      <path d="M7.5 12.5l3 3 6-6.5" stroke="#00E5FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

// Red star
function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD600">
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
    </svg>);

}

// CTA buttons
function PrimaryCTA({ children, onClick, href, target, rel, className = "", arrow = true, pulse = true }) {
  const Tag = href ? motion.a : motion.button;
  const linkProps = href ? { href, target: target || '_blank', rel: rel || 'noopener noreferrer' } : {};
  return (
    <Tag
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...linkProps}
      className={"group relative inline-flex items-center gap-2 rounded-xl text-[15px] font-medium text-white no-underline " +
      "px-9 py-[18px] " + (pulse ? "pulse-red " : "") + className}
      style={{
        background: '#FF1744',
        boxShadow: '0 0 0 0 rgba(255,23,68,.55), 0 18px 40px -12px rgba(255,23,68,.55)'
      }}>
      
      {children}
      {arrow &&
      <span className="inline-block translate-x-0 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      }
    </Tag>);

}

function GhostCTA({ children, onClick, className = "", icon = null }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={"group inline-flex items-center gap-3 rounded-xl px-7 py-[18px] text-[15px] font-medium text-white/80 " + className}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'border-color .3s ease, color .3s ease'
      }}
      onMouseEnter={(e) => {e.currentTarget.style.borderColor = 'rgba(0,229,255,0.45)';e.currentTarget.style.color = '#fff';}}
      onMouseLeave={(e) => {e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';e.currentTarget.style.color = 'rgba(255,255,255,0.80)';}}>
      
      {icon}
      {children}
    </motion.button>);

}

// Format currency
function fmt$(n) {return '$' + Math.round(n).toLocaleString('en-US');}

Object.assign(window, {
  EASE, Section, Tag, AnimatedNumber, FadeUp, CheckCyan, Star, PrimaryCTA, GhostCTA, fmt$
});