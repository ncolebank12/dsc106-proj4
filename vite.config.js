import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') { //if in dev env
    return {
      plugins: [svelte()],
      }
  } else {
    return   {
      plugins: [svelte()],
      base: '/dsc106-proj4'
      }
  }
});
