import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vitePluginRequire from 'vite-plugin-require';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //@ts-expect-error need fix
    vitePluginRequire.default(),
    nodePolyfills()
  ],
  server: {
    open: true,
    host: '0.0.0.0',
    port: 3000
  },
  preview: {
    open: true,
    host: '0.0.0.0',
    port: 3000
  },
})
