## My Portfolio

### Sitemap

`npm run build` generates `dist/sitemap.xml` through the Vite plugin in
`vite.config.ts`. It includes the homepage and every project detail URL from
`src/data/projectsData.ts`; adding or removing a project updates the sitemap on
the next build. If a new public route is added to `src/App.tsx`, also add it to
the plugin's routes. Section anchors and the not-found route are excluded.

Vite copies `public/robots.txt` into `dist/robots.txt`, including the reference to
`https://ekene-dev.com/sitemap.xml`. The GitHub Pages workflow deploys both files
with the rest of `dist`. After deployment, verify `/sitemap.xml` returns XML and
`/robots.txt` includes the sitemap URL. Crawlers can discover it through robots.txt;
it can also be submitted in Google Search Console.
