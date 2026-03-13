import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // WICHTIG: Prüfe, ob die Datei wirklich in src/ liegt und .ts heißt!
      entry: 'src/glass-bms-card.ts',
      name: 'GlassBmsCard',
      formats: ['es'],
      fileName: 'glass-bms-card'
    },
    rollupOptions: {
      // Wir bündeln Lit mit ein, damit die Karte eigenständig läuft
      external: [], 
    },
    outDir: 'dist',
    emptyOutDir: true,
  }
});