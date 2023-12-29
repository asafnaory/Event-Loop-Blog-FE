import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { loadEnv } from "vite";
import node from "@astrojs/node";
const {
  PORT
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const port = Number(PORT) || Number(process.env.PORT) || 4321;
console.log(`Port: ${port}`, PORT);

// https://astro.build/config
export default defineConfig({
  // output: 'hy',
  // server: {
  //   port,
  //   host: '0.0.0.0'
  // },
  integrations: [react(), mdx()],
  adapter: node({
    mode: "standalone"
  })
});