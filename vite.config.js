import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get the PORT from the environment variable
const port = process.env.PORT || 3000;

export default defineConfig({
  plugins: [react()],
  server: {
    port: port, // Use the assigned port
    strictPort: true, // Ensure the app uses the assigned port
  },
});
