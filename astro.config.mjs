// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// En GitHub Actions, GITHUB_ACTIONS=true automaticamente.
// En local y en produccion futura (dominio propio), base queda en '/'.
const base = process.env.GITHUB_ACTIONS ? '/rumbo/' : '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://julibnk.github.io',
  base,
  vite: {
    plugins: [tailwindcss()]
  }
});