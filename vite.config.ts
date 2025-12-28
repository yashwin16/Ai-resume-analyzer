import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    exclude: [
      "pdfjs-dist",
      "react-dropzone",
      "zustand",
      "prop-types",
      "tailwind-merge",
    ],
  },
  ssr: {
    noExternal: [
      "pdfjs-dist",
      "react-dropzone",
      "zustand",
      "prop-types",
      "tailwind-merge",
    ],
  },
  assetsInclude: ["**/*.min.js"], // allow pdf.worker.min.js
});
