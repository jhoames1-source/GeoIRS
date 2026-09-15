import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function serveCapasPlugin() {
  return {
    name: 'serve-capas-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const rawUrl = req.url ? req.url.split('?')[0] : '';
        if (rawUrl.startsWith('/CAPAS/') || rawUrl.startsWith('/capas/')) {
          const decoded = decodeURIComponent(rawUrl);
          const subPath = decoded.replace(/^\/(CAPAS|capas)\//, '');
          const localPath1 = path.resolve(__dirname, 'CAPAS', subPath);
          const localPath2 = path.resolve(__dirname, 'public', 'capas', subPath);
          const localPath = (fs.existsSync(localPath1) && fs.statSync(localPath1).isFile())
            ? localPath1
            : (fs.existsSync(localPath2) && fs.statSync(localPath2).isFile())
            ? localPath2
            : null;

          if (localPath) {
            const ext = path.extname(localPath).toLowerCase();
            const mimeType = ext === '.kmz' ? 'application/vnd.google-earth.kmz'
              : ext === '.kml' ? 'application/vnd.google-earth.kml+xml'
              : ext === '.geojson' || ext === '.json' ? 'application/json'
              : 'application/octet-stream';
            res.setHeader('Content-Type', mimeType);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            fs.createReadStream(localPath).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

function fallbackMainPlugin() {
  return {
    name: 'fallback-main-plugin',
    resolveId(id: string) {
      if ((id === '/src/main.tsx' || id.endsWith('src/main.tsx')) && !fs.existsSync(path.resolve(__dirname, 'src', 'main.tsx')) && fs.existsSync(path.resolve(__dirname, 'main.tsx'))) {
        return path.resolve(__dirname, 'main.tsx');
      }
      if (id === '/main.tsx' && !fs.existsSync(path.resolve(__dirname, 'main.tsx')) && fs.existsSync(path.resolve(__dirname, 'src', 'main.tsx'))) {
        return path.resolve(__dirname, 'src', 'main.tsx');
      }
      return null;
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), serveCapasPlugin(), fallbackMainPlugin()],
  resolve: {
    alias: {
      '@': fs.existsSync(path.resolve(__dirname, 'src'))
        ? path.resolve(__dirname, 'src')
        : path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      ignored: [
        '**/CAPAS/**', 
        '**/public/CAPAS/**', 
        '**/PORTADA Y LOGO/**', 
        '**/*.kmz', 
        '**/*.kml', 
        '**/*.geojson',
        '**/*.jpeg',
        '**/*.jpg',
        '**/*.png',
        '**/scratch/**'
      ],
    },
  },
});
