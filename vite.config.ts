import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { projects } from "./src/data/projectsData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the same project catalog as ProjectDetail so new projects are included at build time.
function sitemapPlugin(): Plugin {
  return {
    name: "portfolio-sitemap",
    apply: "build",
    generateBundle() {
      const routes = ["/", ...projects.map(({ id }) => `/project/${encodeURIComponent(id)}`)];
      const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({
        "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
      })[character]!);
      const urls = [...new Set(routes)].map((route) =>
        `  <url><loc>${escapeXml(new URL(route, "https://ekene-dev.com").href)}</loc></url>`
      );

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
      });

      // Keep the AI-readable overview in sync with the public project catalog.
      const projectLinks = projects.map(({ id, title, description, tools }) =>
        `- [${title}](https://ekene-dev.com/project/${encodeURIComponent(id)}): ${description} Tools: ${tools.join(", ")}.`
      );
      this.emitFile({
        type: "asset",
        fileName: "llms.txt",
        source: [
          "# Ekene Okoli Portfolio",
          "",
          "> Ekene Okoli is a Data Analyst and Frontend Developer based in Lagos, Nigeria, turning complex data into clear business insights and building user-focused web applications.",
          "",
          "Expertise includes Excel, SQL, Power BI, React, TypeScript, and Tailwind CSS. This is a personal portfolio showcasing data analysis and web development projects.",
          "",
          "## Portfolio",
          "",
          "- [Homepage](https://ekene-dev.com/): About Ekene, selected work, experience, and contact information.",
          "",
          "## Projects",
          "",
          ...projectLinks,
          "",
          "## Profiles",
          "",
          "- [LinkedIn](https://linkedin.com/in/ekene-okoli): Ekene Okoli's professional profile.",
          "- [GitHub](https://github.com/khennyyb): Ekene Okoli's code repositories.",
          "",
        ].join("\n"),
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [react(), sitemapPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const vendorChunks: Record<string, string[]> = {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
            'vendor-charts': ['recharts'],
            'vendor-excel': ['exceljs'],
            'vendor-utils': ['date-fns', 'clsx', 'tailwind-merge', 'class-variance-authority'],
          };
          for (const [chunk, pkgs] of Object.entries(vendorChunks)) {
            if (pkgs.some((pkg) => id.includes(`node_modules/${pkg}/`))) {
              return chunk;
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
