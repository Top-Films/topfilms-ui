import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "./src/styles/_mantine";' 
			}
		}
	},
	define: {
		'globalThis.__DEV__': JSON.stringify(false)
	}
});
