import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { projects } from "./src/data/projectsData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the same project catalog as ProjectDetail so new projects are included at build time.
function sitemapPlugin(): Plugin {
  return {
    name: "portfolio-sitemap",
    apply: "build",
    generateBundle() {
      const routes = ["/", ...projects.map(({ id }) => `/project/${encodeURIComponent(id)}/`)];
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
        `- [${title}](https://ekene-dev.com/project/${encodeURIComponent(id)}/): ${description} Tools: ${tools.join(", ")}.`
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
    async writeBundle(options) {
      const outputDir = options.dir ?? "dist";
      const template = await readFile(path.join(outputDir, "index.html"), "utf8");
      const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
      })[character]!);
      // Real HTML entries give GitHub Pages a 200 response for each public project.
      for (const project of projects) {
        if (!/^[a-z0-9-]+$/.test(project.id)) throw new Error(`Invalid project slug: ${project.id}`);
        const url = `https://ekene-dev.com/project/${project.id}/`;
        const html = template
          .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(project.title)} | Ekene Okoli Portfolio</title>`)
          .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${escapeHtml(project.description)}" data-rh="true" />`)
          .replace(/<link rel="canonical"[^>]*>/, () => `<link rel="canonical" href="${url}" data-rh="true" />`)
          .replace(/<meta property="og:url"[^>]*>/, () => `<meta property="og:url" content="${url}" />`)
          .replace(/<div id="root">[\s\S]*<\/div>/, () =>
            `<div id="root"><main class="portfolio-detail min-h-screen bg-background"><div class="container mx-auto px-4 py-12"><a href="/">Ekene Okoli Portfolio</a><h1 class="text-4xl font-bold">${escapeHtml(project.title)}</h1><p>${escapeHtml(project.description)}</p><p>Tools: ${escapeHtml(project.tools.join(", "))}</p></div></main></div>\n`);
        const directory = path.join(outputDir, "project", project.id);
        await mkdir(directory, { recursive: true });
        await writeFile(path.join(directory, "index.html"), html);
      }
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
