import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { loadEnv } from "vite";
const { PORT } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

const port =  Number(PORT) ||  Number(process.env.PORT) || 4321;
console.log(`Port: ${port}`, PORT);
export default defineConfig({
  server: { port, host: '0.0.0.0'},
  integrations: [react(), mdx()],
});