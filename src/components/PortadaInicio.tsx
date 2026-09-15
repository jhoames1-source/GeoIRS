import React, { useState } from 'react';
import { 
  Sparkles, Compass, ShieldCheck, Cpu, ArrowRight, Layers, 
  MapPin, CheckCircle2, ChevronRight, Globe, Zap, Trees
} from 'lucide-react';

interface PortadaInicioProps {
  onEnterPortal: () => void;
}

export const PortadaInicio: React.FC<PortadaInicioProps> = ({ onEnterPortal }) => {
  const [isWarping, setIsWarping] = useState(false);

  const playPortalSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      // Oscilador armónico para sonido espacial futurista
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      const now = ctx.currentTime;
      osc1.frequency.setValueAtTime(261.63, now); // C4
      osc1.frequency.exponentialRampToValueAtTime(523.25, now + 0.25); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.6); // C6

      osc2.frequency.setValueAtTime(329.63, now); // E4
      osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.25); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.6); // E6

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } catch (e) {
      // Ignorar restricciones de audio del navegador
    }
  };

  const handleLogoClick = () => {
    if (isWarping) return;
    setIsWarping(true);
    playPortalSound();
    setTimeout(() => {
      onEnterPortal();
    }, 650);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-slate-950 text-white select-none transition-all duration-700 ${
        isWarping ? 'scale-110 opacity-0 blur-md pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* Fondo Panorámico con Animación Ken Burns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src="/portada/Inicio_Portada.jpg" 
          alt="Portada GeoIRS" 
          className="w-full h-full object-cover object-center animate-kenburns opacity-90 scale-105"
        />
        {/* Degradados de atmósfera cinematográfica */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950/90" />
      </div>

      {/* Onda de choque (shockwave) al hacer clic */}
      {isWarping && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="w-64 h-64 rounded-full border-4 border-emerald-400/80 animate-ping opacity-90" />
          <div className="w-96 h-96 rounded-full border-2 border-cyan-400/60 animate-ping opacity-70" />
        </div>
      )}

      {/* ======================================================== */}
      {/* BARRA SUPERIOR INSTITUCIONAL */}
      {/* ======================================================== */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-slate-950/50 border-b border-emerald-500/20">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-300">
              MINAM • D.L. N° 1278
            </span>
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-slate-300 tracking-wide">
            República del Perú • Infraestructuras de Disposición Final (IRS)
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/60">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Motor GeoAI v2.0 Activo</span>
          </div>
          <button
            onClick={handleLogoClick}
            className="group flex items-center space-x-2 bg-emerald-600/90 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/30 active:scale-95 border border-emerald-400/40"
          >
            <span>Ingresar al Geoportal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* CUERPO CENTRAL: LOGO INTERACTIVO Y EFECTO PORTAL */}
      {/* ======================================================== */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto px-4 text-center">
        
        {/* Hotspot Interactivo sobre el Logo Central con Fondo 100% Transparente */}
        <div 
          onClick={handleLogoClick}
          className="group relative cursor-pointer flex items-center justify-center w-72 h-64 sm:w-96 sm:h-80 md:w-[500px] md:h-[380px] transition-all duration-300 hover:scale-105 active:scale-95 select-none"
          title="Haz clic en el Logo GeoIRS para ingresar al Geoportal"
        >
          {/* Anillos concéntricos de pulso radar centrados en la diana del Logo */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-emerald-400/40 animate-radar-1 pointer-events-none" />
          <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-cyan-400/30 animate-radar-2 pointer-events-none" />
          <div className="absolute w-96 h-96 sm:w-[440px] sm:h-[440px] rounded-full border border-emerald-500/20 animate-radar-3 pointer-events-none" />

          {/* Halo sutil de luz bio-digital que se intensifica al pasar el cursor */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-radial-gradient from-emerald-400/25 via-cyan-400/15 to-transparent blur-2xl opacity-40 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
        </div>

      </main>

      {/* ======================================================== */}
      {/* CINTURÓN INFERIOR: PILARES TÉCNICOS Y NORMATIVOS */}
      {/* ======================================================== */}
      <footer className="relative z-10 px-4 sm:px-8 py-5 backdrop-blur-xl bg-slate-950/70 border-t border-emerald-500/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Tarjeta 1: Normativa MINAM */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-colors backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">Normativa MINAM</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              D.L. N° 1278 y D.S. N° 014-2017-MINAM. Exclusiones por centros poblados (&ge;500 m), fallas activas (&ge;1 km) y fajas marginales.
            </p>
          </div>

          {/* Tarjeta 2: Motor GeoAI & AHP */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">Motor GeoAI & AHP</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Ponderación analítica jerárquica (Cuadro N° 06 MINAM) y peritaje asistido por IA para optimización de áreas candidatas.
            </p>
          </div>

          {/* Tarjeta 3: CUM Suelos & ZEE */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-lime-500/40 transition-colors backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-lime-400 mb-1">
              <Trees className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">CUM Suelos & ZEE</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Capacidad de Uso Mayor (D.S. 017-2009-AG), salvaguarda contra pérdida de tierras agrícolas y compatibilidad territorial regional.
            </p>
          </div>

          {/* Tarjeta 4: Ingeniería & SBN */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-orange-400/40 transition-colors backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-orange-400 mb-1">
              <Compass className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">Ingeniería & SBN</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Rosa de vientos (sotavento), balance in situ de material de cobertura (20%) y tenencia predial estatal SINABIP.
            </p>
          </div>

        </div>

        <div className="mt-3 text-center text-[10.5px] text-slate-400 flex items-center justify-center space-x-2">
          <span>© 2026 GEOPORTAL GeoIRS PERÚ • Creado por <strong className="text-slate-300 font-semibold">Crhistian Jhoames Paredes García</strong></span>
          <span>•</span>
          <button 
            onClick={handleLogoClick}
            className="text-emerald-400 hover:text-emerald-300 underline font-bold"
          >
            Entrar Directamente
          </button>
        </div>
      </footer>
    </div>
  );
};
