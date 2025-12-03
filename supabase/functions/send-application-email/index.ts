import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  candidateName: string;
  position: string;
  type: "selection" | "rejection" | "interview";
  interviewDate?: string;
  interviewTime?: string;
  meetLink?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, candidateName, position, type, interviewDate, interviewTime, meetLink }: EmailRequest = await req.json();
    
    console.log(`Sending ${type} email to ${to} for ${candidateName}`);

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailPassword) {
      console.error("Gmail credentials not configured");
      throw new Error("Gmail credentials not configured");
    }

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: gmailUser,
          password: gmailPassword,
        },
      },
    });

    let subject = "";
    let htmlContent = "";

    if (type === "selection") {
      subject = `🎉 Congratulations! You've been selected - ${position}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <body style="margin:0; padding:20px; font-family:Arial, sans-serif; background:#f5f5f5;">
          <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#8b5cf6,#3b82f6); padding:30px; text-align:center;">
              <h1 style="color:#fff; margin:0; font-size:24px;">Nirikshan AI</h1>
            </div>
            <div style="padding:30px;">
              <div style="text-align:center; margin-bottom:20px;">
                <span style="background:#22c55e; color:#fff; padding:8px 20px; border-radius:20px; font-size:14px;">✓ SELECTED</span>
              </div>
              <h2 style="color:#333; margin:0 0 15px;">Congratulations, ${candidateName}!</h2>
              <p style="color:#555; line-height:1.6;">
                We are thrilled to inform you that you have been <strong style="color:#22c55e;">selected</strong> for the <strong>${position}</strong> position at Nirikshan AI!
              </p>
              <p style="color:#555; line-height:1.6;">
                Our team will contact you shortly with onboarding details and next steps.
              </p>
              <p style="color:#555; margin-top:25px;">
                Best regards,<br><strong style="color:#8b5cf6;">The Nirikshan AI Team</strong>
              </p>
            </div>
            <div style="background:#f8f9fa; padding:15px; text-align:center; border-top:1px solid #eee;">
              <p style="color:#888; font-size:12px; margin:0;">Nirikshan AI | Empowering Vision and Intelligence</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === "interview") {
      subject = `📅 Interview Scheduled - ${position} at Nirikshan AI`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <body style="margin:0; padding:20px; font-family:Arial, sans-serif; background:#f5f5f5;">
          <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#8b5cf6,#3b82f6); padding:30px; text-align:center;">
              <h1 style="color:#fff; margin:0; font-size:24px;">Nirikshan AI</h1>
            </div>
            <div style="padding:30px;">
              <div style="text-align:center; margin-bottom:20px;">
                <span style="background:#3b82f6; color:#fff; padding:8px 20px; border-radius:20px; font-size:14px;">📅 INTERVIEW SCHEDULED</span>
              </div>
              <h2 style="color:#333; margin:0 0 15px;">Hello, ${candidateName}!</h2>
              <p style="color:#555; line-height:1.6;">
                We have reviewed your application for <strong>${position}</strong> and would like to invite you for an interview!
              </p>
              
              <div style="background:#f0f7ff; border:1px solid #3b82f6; border-radius:8px; padding:20px; margin:20px 0;">
                <h3 style="color:#3b82f6; margin:0 0 15px; font-size:16px;">📋 Interview Details</h3>
                <p style="color:#333; margin:5px 0;"><strong>📅 Date:</strong> ${interviewDate || 'To be confirmed'}</p>
                <p style="color:#333; margin:5px 0;"><strong>⏰ Time:</strong> ${interviewTime || 'To be confirmed'}</p>
                ${meetLink ? `<p style="color:#333; margin:15px 0 5px;"><strong>🔗 Google Meet Link:</strong></p>
                <a href="${meetLink}" style="display:inline-block; background:#22c55e; color:#fff; padding:10px 20px; border-radius:5px; text-decoration:none; margin-top:5px;">Join Meeting</a>` : ''}
              </div>
              
              <p style="color:#555; line-height:1.6;">
                Please confirm your availability by replying to this email. We look forward to speaking with you!
              </p>
              <p style="color:#555; margin-top:25px;">
                Best regards,<br><strong style="color:#8b5cf6;">The Nirikshan AI Team</strong>
              </p>
            </div>
            <div style="background:#f8f9fa; padding:15px; text-align:center; border-top:1px solid #eee;">
              <p style="color:#888; font-size:12px; margin:0;">Nirikshan AI | Empowering Vision and Intelligence</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      subject = `Application Update - ${position}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <body style="margin:0; padding:20px; font-family:Arial, sans-serif; background:#f5f5f5;">
          <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#8b5cf6,#3b82f6); padding:30px; text-align:center;">
              <h1 style="color:#fff; margin:0; font-size:24px;">Nirikshan AI</h1>
            </div>
            <div style="padding:30px;">
              <h2 style="color:#333; margin:0 0 15px;">Dear ${candidateName},</h2>
              <p style="color:#555; line-height:1.6;">
                Thank you for your interest in the <strong>${position}</strong> position at Nirikshan AI.
              </p>
              <p style="color:#555; line-height:1.6;">
                After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.
              </p>
              <p style="color:#555; line-height:1.6;">
                We encourage you to apply for future opportunities. We wish you the best in your career journey!
              </p>
              <p style="color:#555; margin-top:25px;">
                Best regards,<br><strong style="color:#8b5cf6;">The Nirikshan AI Team</strong>
              </p>
            </div>
            <div style="background:#f8f9fa; padding:15px; text-align:center; border-top:1px solid #eee;">
              <p style="color:#888; font-size:12px; margin:0;">Nirikshan AI | Empowering Vision and Intelligence</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    console.log(`Sending email with subject: ${subject}`);

    await client.send({
      from: gmailUser,
      to: to,
      subject: subject,
      content: "Please view this email in an HTML-compatible email client.",
      html: htmlContent,
    });

    await client.close();

    console.log(`Email sent successfully to ${to}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
