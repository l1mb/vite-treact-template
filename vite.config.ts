import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    css: {
      postcss: '.postcssrc.cjs',
    },
    resolve: {
      alias: {
        images: '/src/assets/images',
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: env.VITE_API_CHANGE_ORIGIN == 'true',
          secure: env.VITE_API_SECURE == 'true',
        },
      },
    },
  };
});
