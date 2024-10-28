import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
//tsconfig.node.json必須加上allowSyntheticDefaultImports, 否則出現path error
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
  ],
  resolve: {
    alias: {
      //tsconfig.json, vite.config.ts 都必須加@ts0才能使用捷徑 !!
      "@": path.resolve(__dirname, "./src"),
      "@base": path.resolve(__dirname, "../base_sve/src"),
    },
  },
});
