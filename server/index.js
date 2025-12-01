require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for frontend
app.use(cors());

// parse JSON bodies for API endpoints
app.use(express.json());

// Check required email environment variables
const requiredEnv = ["GMAIL_USER", "GMAIL_APP_PASSWORD"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Warning: ${key} not set in .env - email functionality will not work`);
  }
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Email template generator
const getTemplate = (type, candidateName, position) => {
  if (type === "selection") {
    return {
      subject: `Congratulations! You've Been Selected for ${position} at Nirikshan AI`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">🎉 Congratulations!</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937;">Dear ${candidateName},</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              We are thrilled to inform you that you have been <strong style="color: #10b981;">selected</strong>
              for the position of <strong>${position}</strong> at Nirikshan AI.
            </p>
            <p style="color: #4b5563; line-height: 1.6;">
              Your skills, experience, and enthusiasm impressed our team, and we believe you will be a valuable addition to our organization.
            </p>
            <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
              <h3 style="color: #166534; margin-top: 0;">Next Steps:</h3>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
                <li>Our HR team will reach out to you within the next 2-3 business days.</li>
                <li>Please keep your documents ready for the onboarding process.</li>
                <li>Feel free to reply to this email if you have any questions.</li>
              </ul>
            </div>
            <p style="color: #4b5563; line-height: 1.6;">
              We look forward to having you on our team and can't wait to see the great things we'll accomplish together!
            </p>
            <br/>
            <p style="color: #1f2937;">Best regards,</p>
            <p style="color: #1f2937; font-weight: bold;">Nirikshan AI Team</p>
          </div>
          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p>© 2025 Nirikshan AI. All rights reserved.</p>
            <p>This email was sent from ${process.env.GMAIL_USER}</p>
          </div>
        </div>
      `,
    };
  }

  return {
    subject: `Update on Your Application for ${position} at Nirikshan AI`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Application Update</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937;">Dear ${candidateName},</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for taking the time to apply for the position of <strong>${position}</strong> at Nirikshan AI and for your interest in joining our team.
          </p>
          <p style="color: #4b5563; line-height: 1.6;">
            After careful consideration of all applications, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current requirements.
          </p>
          <p style="color: #4b5563; line-height: 1.6;">
            This decision was not easy, as we received many strong applications including yours. Please know that this does not reflect on your abilities or potential.
          </p>
          <div style="background: #f3f4f6; border-left: 4px solid #6b7280; padding: 15px; margin: 20px 0;">
            <p style="color: #4b5563; margin: 0;">
              We encourage you to apply for future openings that match your skills and experience. We keep all applications on file and may reach out if a suitable position becomes available.
            </p>
          </div>
          <p style="color: #4b5563; line-height: 1.6;">
            We truly appreciate your interest in Nirikshan AI and wish you the very best in your career journey.
          </p>
          <br/>
          <p style="color: #1f2937;">Best regards,</p>
          <p style="color: #1f2937; font-weight: bold;">Nirikshan AI Team</p>
        </div>
        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>© 2025 Nirikshan AI. All rights reserved.</p>
          <p>This email was sent from ${process.env.GMAIL_USER}</p>
        </div>
      </div>
    `,
  };
};

// API: Send selection/rejection emails
app.post("/api/email/send", async (req, res) => {
  try {
    const { to, candidateName, position, type } = req.body;

    if (
      !to ||
      !candidateName ||
      !position ||
      !["selection", "rejection"].includes(type)
    ) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return res.status(500).json({ error: "Email credentials not configured" });
    }

    const template = getTemplate(type, candidateName, position);

    await transporter.sendMail({
      from: `Nirikshan AI <${process.env.GMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html,
    });

    console.log(`✅ ${type} email sent to ${to} (${candidateName})`);
    return res.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: error.message || "Failed to send email" });
  }
});

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
  if (process.env.GMAIL_USER) {
    console.log(`📧 Email service configured with ${process.env.GMAIL_USER}`);
  } else {
    console.log(`⚠️  Email service not configured - set GMAIL_USER and GMAIL_APP_PASSWORD in .env`);
  }
});