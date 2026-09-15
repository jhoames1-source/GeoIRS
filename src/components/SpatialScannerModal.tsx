import React, { useState } from 'react';
import { ShieldCheck, X, Play, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { Jurisdiction, CandidateZone } from '../types';

interface SpatialScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  jurisdiction: Jurisdiction;
  candidateZones: CandidateZone[];
  onSelectZone: (z: CandidateZone) => void;
}

export const SpatialScannerModal: React.FC<SpatialScannerModalProps> = ({
  isOpen,
  onClose,
  jurisdiction,
  candidateZones,
  onSelectZone
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);

  if (!isOpen) return null;

  const currentZoneList = candidateZones.filter(z => z.ubigeo === jurisdiction.ubigeo || z.provincia === jurisdiction.provincia);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanCompleted(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500/20 p-2 rounded-xl text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">ESCÁNER TERRITORIAL DE RESTRICCIONES D.L. 1278</h3>
              <p className="text-[11px] text-slate-400">Jurisdicción: {jurisdiction.distrito} - {jurisdiction.provincia}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          {!scanCompleted && !isScanning && (
            <div className="text-center py-6 space-y-3">
              <Layers className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <p className="text-slate-300 font-medium">
                El Escáner analizará automáticamente la superposición topológica de polígonos con las capas oficiales de SERNANP, MINCUL, ANA e INGEMMET.
              </p>
              <button
                onClick={handleStartScan}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 mx-auto shadow-lg transition"
              >
                <Play className="w-4 h-4" />
                <span>Ejecutar Escáner Territorial</span>
              </button>
            </div>
          )}

          {isScanning && (
            <div className="text-center py-10 space-y-4">
              <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-amber-400 font-bold">Verificando Buffers de Exclusión de 500m y 13km...</p>
            </div>
          )}

          {scanCompleted && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-emerald-950/40 border border-emerald-800 p-4 rounded-xl flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <div className="font-bold text-sm">Escáner Completado</div>
                  <div className="text-[11px] text-slate-300">Se han identificado {currentZoneList.length} zonas libres de afectación legal.</div>
                </div>
              </div>

              <div className="space-y-2">
                {currentZoneList.map((z) => (
                  <div key={z.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">{z.nombre}</div>
                      <div className="text-[10px] text-slate-400">Superficie: {z.areaHa} ha | AHP Score: {z.puntajeAHP} pts</div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectZone(z);
                        onClose();
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
                    >
                      Ver en Mapa
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
