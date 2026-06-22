import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// exported plugin array
export const plugins: any[] = [react(), tailwindcss()]

// https://vite.dev/config/
export default defineConfig(async () => {
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {}
  return { plugins };
})
