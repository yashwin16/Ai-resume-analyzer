import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ["pdfjs-dist"], // prevent pre-bundling
  },
  ssr: {
    noExternal: ["pdfjs-dist", "react-router", "tailwind-merge", "zustand"], // skip server-side bundling
  },
  assetsInclude: ["**/*.min.js"], // include pdf.worker.min.js
});

