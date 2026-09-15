import React, { useState } from 'react';
import { Globe2, RefreshCw, ExternalLink, Maximize2, Layers } from 'lucide-react';

export const GeoPeruLiveVisor: React.FC = () => {
  const [currentLayer, setCurrentLayer] = useState<'19470' | '18920' | '16450'>('19470');
  const [iframeKey, setIframeKey] = useState(0);

  const layerUrls = {
    '19470': 'https://visor.geoperu.gob.pe/?layers=19470',
    '18920': 'https://visor.geoperu.gob.pe/?layers=18920',
    '16450': 'https://visor.geoperu.gob.pe/?layers=16450'
  };

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="flex-1 bg-slate-950 flex flex-col h-full overflow-hidden text-slate-100">
      {/* Top Bar Controls */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 px-6 flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600/20 p-2 rounded-lg text-emerald-400 border border-emerald-500/30">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white flex items-center space-x-2">
              <span>VISOR EN VIVO GEOPERÚ (PCM / MINAM)</span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Capa {currentLayer}
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Servicio interoperable oficial de la Presidencia del Consejo de Ministros y MINAM
            </p>
          </div>
        </div>

        {/* Switcher & Buttons */}
        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setCurrentLayer('19470')}
              className={`px-3 py-1 rounded-md font-bold transition ${currentLayer === '19470' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              19470 (Residuos)
            </button>
            <button
              onClick={() => setCurrentLayer('18920')}
              className={`px-3 py-1 rounded-md font-bold transition ${currentLayer === '18920' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              18920 (Botaderos OEFA)
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
            title="Recargar Visor GeoPerú"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <a
            href={layerUrls[currentLayer]}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-950 transition"
          >
            <span>Abrir en GeoPerú</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Responsive IFrame */}
      <div className="flex-1 relative w-full h-full bg-slate-950">
        <iframe
          key={iframeKey}
          src={layerUrls[currentLayer]}
          title="GeoPerú Visor Oficial"
          className="w-full h-full border-none"
          allow="geolocation"
        />
      </div>
    </div>
  );
};
