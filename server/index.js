const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 4000;

// parse JSON bodies for API endpoints
app.use(express.json());

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

// API: accept talent submissions from the Careers page
app.post('/api/talent', async (req, res) => {
  try {
    const { fullName, email, roleInterest, experience, attachment } = req.body || {};
    if (!fullName || !email) {
      return res.status(400).json({ ok: false, error: 'fullName and email are required' });
    }

    const dataDir = path.join(__dirname, '..', 'data');
    const filePath = path.join(dataDir, 'talent.json');
    await fs.promises.mkdir(dataDir, { recursive: true });

    let current = [];
    if (fs.existsSync(filePath)) {
      try {
        const txt = await fs.promises.readFile(filePath, 'utf8');
        current = txt ? JSON.parse(txt) : [];
      } catch (err) {
        // if parsing fails, start fresh array
        current = [];
      }
    }

    const entry = {
      id: Date.now(),
      fullName,
      email,
      roleInterest: roleInterest || null,
      experience: experience || null,
      attachment: attachment || null,
      receivedAt: new Date().toISOString(),
      userAgent: req.get('User-Agent') || null,
      ip: req.ip || req.connection?.remoteAddress || null,
    };

    current.push(entry);
    await fs.promises.writeFile(filePath, JSON.stringify(current, null, 2), 'utf8');

    return res.json({ ok: true });
  } catch (err) {
    console.error('Failed to save talent submission', err);
    return res.status(500).json({ ok: false, error: 'internal error' });
  }
});

// API: proxy email sending to Supabase Edge Function
app.post('/api/email/send', async (req, res) => {
  try {
    const { to, candidateName, position, type } = req.body || {};
    if (!to || !candidateName || !position || !type) {
      return res.status(400).json({ ok: false, error: 'Missing required fields: to, candidateName, position, type' });
    }

    // Ensure required env vars
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({
        ok: false,
        error: 'Server misconfiguration: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set',
      });
    }

    // Edge Function endpoint (update name if different)
    const edgeUrl = `${SUPABASE_URL}/functions/v1/send-email`;

    // Optional: enforce known types
    const allowedTypes = new Set(['selection', 'rejection', 'interview']);
    if (!allowedTypes.has(type)) {
      return res.status(400).json({ ok: false, error: `Invalid email type '${type}'` });
    }

    // Forward request to Edge Function with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const edgeResp = await fetch(edgeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Use service role for server-to-server call
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ to, candidateName, position, type }),
      signal: controller.signal,
    }).catch((err) => {
      // Network/abort errors
      throw new Error(`Edge Function request failed: ${err.message}`);
    });
    clearTimeout(timeout);

    const text = await edgeResp.text(); // Read as text to capture non-JSON errors
    let json;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!edgeResp.ok) {
      console.error('Edge Function error:', {
        status: edgeResp.status,
        statusText: edgeResp.statusText,
        body: text,
      });
      // Normalize error message
      const message =
        (json && (json.error || json.message)) ||
        `Edge Function returned ${edgeResp.status}: ${edgeResp.statusText}`;
      return res.status(502).json({ ok: false, error: message });
    }

    // Success
    return res.json({ ok: true, ...(json || {}) });
  } catch (err) {
    console.error('Email proxy failed:', err);
    const message =
      err.name === 'AbortError'
        ? 'Email service timed out. Please try again.'
        : err.message || 'Internal error while sending email';
    return res.status(500).json({ ok: false, error: message });
  }
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
