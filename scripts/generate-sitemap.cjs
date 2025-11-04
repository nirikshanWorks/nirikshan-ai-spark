const fs = require('fs');
const path = require('path');

const baseUrl = 'https://nirikshanai.in';
const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const expertiseDataPath = path.join(__dirname, '..', 'src', 'pages', 'expertise', 'expertiseData.ts');

function readFile(p) {
  return fs.readFileSync(p, { encoding: 'utf8' });
}

function extractSlugs(tsContent) {
  const re = /slug:\s*"([a-z0-9\-]+)"/gi;
  const slugs = new Set();
  let m;
  while ((m = re.exec(tsContent)) !== null) {
    slugs.add(m[1]);
  }
  return Array.from(slugs);
}

function buildUrls(slugs) {
  const urls = new Set();
  const staticRoutes = ['/', '/about', '/contact', '/expertise', '/services', '/projects', '/careers', '/testimonials', '/privacy', '/terms'];
  staticRoutes.forEach(r => urls.add(r));
  slugs.forEach(s => {
    urls.add(`/expertise/${s}`);
  });
  return Array.from(urls);
}

function isoDate(d) {
  return d.toISOString().split('T')[0];
}

function generateXml(urls) {
  const now = isoDate(new Date());
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  urls.forEach(u => {
    lines.push('  <url>');
    lines.push(`    <loc>${baseUrl}${u}</loc>`);
    lines.push(`    <lastmod>${now}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push('    <priority>0.7</priority>');
    lines.push('  </url>');
  });
  lines.push('</urlset>');
  return lines.join('\n');
}

function ensurePublicDir() {
  const p = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function main() {
  if (!fs.existsSync(expertiseDataPath)) {
    console.error('Could not find expertiseData.ts at', expertiseDataPath);
    process.exit(1);
  }

  const content = readFile(expertiseDataPath);
  const slugs = extractSlugs(content);
  const urls = buildUrls(slugs);
  const xml = generateXml(urls);

  ensurePublicDir();
  fs.writeFileSync(outPath, xml, { encoding: 'utf8' });
  console.log('Wrote sitemap to', outPath);
}

main();
