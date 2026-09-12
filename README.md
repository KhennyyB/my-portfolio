## My Portfolio

### Primary domain and Netlify migration

The primary address is `https://ekene-dev.com/`. Each build creates a static HTML
entry for every project, with its own title, description, canonical URL, and
readable project summary. GitHub Pages serves these directories directly instead
of sending valid project requests through its 404 fallback.

Deploy this repository to the existing `ekene-dev.netlify.app` Netlify site as well
as GitHub Pages. `netlify.toml` sets the build and publish directory; Vite copies
`public/_redirects` into `dist`. Its forced 301 rules redirect only the old Netlify
hostname to the primary domain, preserving paths and Netlify's default query-string
forwarding. Do not delete the old Netlify site: it must stay online to serve redirects.

After both deployments:

- Verify the Netlify homepage and a project URL return 301 redirects to the new domain.
- Verify the destination homepage and project pages return HTTP 200.
- Verify both sites in Google Search Console and use Change of Address for the old
  Netlify property if available.
- Submit `https://ekene-dev.com/sitemap.xml` and request homepage indexing using URL Inspection.
- Update portfolio links in LinkedIn, GitHub, and other profiles to the primary domain.
- Keep redirects for at least one year; Google needs to recrawl before results change.

### AI-readable overview

`npm run build` generates `dist/llms.txt` from the project catalog, with a portfolio
summary and links to every project. The HTML head links to `/llms.txt` using
`rel="describedby"`. Deploy `dist` to publish it alongside the sitemap. Existing
robots.txt rules allow all crawlers. This context file helps compatible AI tools
read the portfolio; it does not guarantee indexing or recommendations.

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
