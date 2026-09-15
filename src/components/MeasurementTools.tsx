import React from 'react';
import { Ruler, Trash2, Undo2, X, Compass, RotateCcw, CheckCircle2 } from 'lucide-react';

interface MeasurementToolsProps {
  isActive: boolean;
  onToggle: () => void;
  onUndoVertex?: () => void;
  onClearAll?: () => void;
  onCompletePolygon?: () => void;
  hasActiveFeatures?: boolean;
  onCenterMap?: () => void;
}

export const MeasurementTools: React.FC<MeasurementToolsProps> = ({
  isActive,
  onToggle,
  onUndoVertex,
  onClearAll,
  onCompletePolygon,
  hasActiveFeatures = true,
  onCenterMap
}) => {
  // Modo 1: Digitalización Activa de Polígonos
  if (isActive) {
    return (
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-slate-950/95 backdrop-blur-xl border border-cyan-500/80 p-2 px-4 rounded-full shadow-2xl flex items-center space-x-3 text-slate-100 text-xs animate-in slide-in-from-top duration-200 select-none">
        <div className="flex items-center space-x-2 text-cyan-400 font-extrabold pr-2 border-r border-slate-800">
          <Ruler className="w-4 h-4 animate-pulse shrink-0" />
          <span>MODO POLÍGONO: Clic para Vértice • Doble Clic para Cerrar</span>
        </div>

        <div className="flex items-center space-x-2">
          {onCompletePolygon && (
            <button
              onClick={onCompletePolygon}
              className="px-3.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white text-[11px] font-extrabold flex items-center space-x-1.5 transition shadow-lg shadow-emerald-950/60 active:scale-95 animate-pulse"
              title="Cerrar el polígono trazado y calcular buffer de búsqueda"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cerrar Polígono y Buscar</span>
            </button>
          )}

          <button
            onClick={onUndoVertex}
            className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 hover:text-white text-[11px] font-extrabold flex items-center space-x-1.5 transition shadow active:scale-95"
            title="Deshacer el último vértice trazado"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Deshacer Vértice</span>
          </button>

          <button
            onClick={onClearAll}
            className="px-3 py-1 rounded-full bg-rose-950/50 hover:bg-rose-900 border border-rose-800 text-rose-300 hover:text-white text-[11px] font-extrabold flex items-center space-x-1.5 transition shadow active:scale-95"
            title="Borrar todas las geometrías trazadas del mapa"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar Polígonos</span>
          </button>

          <button
            onClick={onToggle}
            className="p-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Finalizar modo digitalización"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Modo 2: Barra de Control Flotante Permanente para Deshacer (Undo) y Limpiar Todo (Clear All)
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-slate-950/90 backdrop-blur-xl border border-slate-800 hover:border-slate-700 p-1.5 px-3 rounded-full shadow-2xl flex items-center space-x-2 text-slate-100 text-xs transition duration-200 select-none">
      <div className="flex items-center space-x-1.5 text-emerald-400 font-extrabold px-1 text-[11px]">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="tracking-wide">HERRAMIENTAS GIS:</span>
      </div>

      <div className="h-4 w-[1px] bg-slate-800" />

      {/* Botón Deshacer Último Paso (Undo) */}
      <button
        onClick={onUndoVertex}
        className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500 text-amber-300 hover:text-amber-200 text-[11px] font-black flex items-center space-x-1.5 transition shadow active:scale-95 cursor-pointer"
        title="Deshacer el último paso (último vértice, distrito o alternativa)"
      >
        <Undo2 className="w-3.5 h-3.5 text-amber-400" />
        <span>Deshacer Último Paso</span>
      </button>

      {/* Botón Limpiar Todo (Clear All) */}
      <button
        onClick={onClearAll}
        className="px-3 py-1 rounded-full bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 hover:border-rose-600 text-rose-300 hover:text-rose-100 text-[11px] font-black flex items-center space-x-1.5 transition shadow active:scale-95 cursor-pointer"
        title="Restablece el mapa eliminando buffers, polígonos y alternativas para reiniciar la consulta"
      >
        <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
        <span>Limpiar Todo</span>
      </button>

      {onCenterMap && (
        <button
          onClick={onCenterMap}
          className="p-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition"
          title="Centrar mapa en la referencia"
        >
          <Compass className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

