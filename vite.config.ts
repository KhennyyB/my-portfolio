import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase the warning limit (kB). Keep this reasonably low while you iterate.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // Core react libs -> single chunk
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom") ||
            id.includes("@tanstack")
          ) {
            return "react-vendor";
          }
          // UI primitives (Radix)
          if (id.includes("@radix-ui")) {
            return "radix-ui";
          }
          // Charting / heavy data libs
          if (id.includes("recharts") || id.includes("exceljs") || id.includes("chart.js")) {
            return "charts-vendor";
          }
          // Icons
          if (id.includes("lucide-react") || id.includes("heroicons") || id.includes("react-icons")) {
            return "icons";
          }
          // Supabase / auth / network
          if (id.includes("@supabase") || id.includes("gotrue-js") || id.includes("postgrest-js")) {
            return "supabase";
          }
          // Tailwind runtime / animation plugin (if pulled in)
          if (id.includes("tailwindcss-animate")) {
            return "tailwind-animate";
          }
          // Fallback vendor chunk
          return "vendor";
        },
      },
    },
  },
}));