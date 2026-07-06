import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Dev-only: resolve clean URLs for the static pages generated into public/gcc/
// (e.g. /gcc/companies/3m-co/ -> public/gcc/companies/3m-co/index.html), matching
// how Netlify serves directory indexes in production before the SPA catch-all.
const gccStaticPages = (): Plugin => ({
  name: "gcc-static-pages",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = (req.url ?? "").split("?")[0];
      if (url.startsWith("/gcc") && !path.extname(url)) {
        const withSlash = url.endsWith("/") ? url : `${url}/`;
        const file = path.resolve(__dirname, "public", `.${withSlash}index.html`);
        if (fs.existsSync(file)) {
          req.url = `${withSlash}index.html`;
        }
      }
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), gccStaticPages(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
