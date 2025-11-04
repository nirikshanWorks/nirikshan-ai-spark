const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 4000;

// Serve static build
const staticPath = path.join(__dirname, "..", "dist");
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
}

// Simple health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// robots.txt
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nAllow: /\nSitemap: " + req.protocol + "://" + req.get("host") + "/sitemap.xml\n");
});

// sitemap.xml - minimal dynamic sitemap using known routes
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const pages = [
    '/',
    '/about',
    '/contact',
    '/expertise',
    '/projects',
    '/case-studies',
    '/careers',
    '/who-we-are',
  ];

  const urls = pages.map((p) => {
    return `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  res.type('application/xml');
  res.send(xml);
});

// runtime env injection for client-side access without rebuilding
// Serves a tiny JS file that assigns `window.__ENV` from process.env
app.get('/env.js', (req, res) => {
  const env = {
    VITE_RECAPTCHA_SITE_KEY: process.env.VITE_RECAPTCHA_SITE_KEY || ''
  };
  res.type('application/javascript');
  // avoid caching so operators can change envs between deploys
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.send(`window.__ENV = ${JSON.stringify(env)};`);
});

// fallback to index.html for client-side routing
app.get('*', (req, res) => {
  const indexHtml = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
