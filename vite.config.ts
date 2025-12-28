import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],

  resolve: {
    alias: {
      "pdfjs-dist": "pdfjs-dist/build/pdf",
    },
  },

  optimizeDeps: {
    exclude: ["pdfjs-dist"],
  },
});
