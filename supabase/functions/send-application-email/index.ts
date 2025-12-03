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
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, candidateName, position, type }: EmailRequest = await req.json();
    
    console.log(`Sending ${type} email to ${to} for ${candidateName}`);

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailPassword) {
      console.error("Gmail credentials not configured");
      throw new Error("Gmail credentials not configured");
    }

    console.log(`Using Gmail account: ${gmailUser}`);

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

    const subject = type === "selection" 
      ? `Congratulations! You've been selected for ${position}`
      : type === "interview"
      ? `Interview Invitation - ${position} at Nirikshan AI`
      : `Update on your application for ${position}`;

    const htmlContent = type === "selection"
      ? `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0118; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0118; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a0b2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);">
                  <!-- Header with gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Nirikshan AI</h1>
                      <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px; letter-spacing: 2px;">EMPOWERING VISION & INTELLIGENCE</p>
                    </td>
                  </tr>
                  
                  <!-- Success Badge -->
                  <tr>
                    <td align="center" style="padding: 30px 40px 0;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 12px 30px; border-radius: 50px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);">
                        <span style="color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 1px;">✓ SELECTED</span>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 30px 40px; color: #e2e8f0;">
                      <h2 style="margin: 0 0 20px; color: #22c55e; font-size: 28px; font-weight: 600;">Congratulations, ${candidateName}!</h2>
                      
                      <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        We are thrilled to inform you that you have been <strong style="color: #22c55e;">selected</strong> for the position of:
                      </p>
                      
                      <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 20px; margin: 20px 0; border-radius: 8px;">
                        <p style="margin: 0; font-size: 20px; font-weight: 600; color: #a78bfa;">${position}</p>
                      </div>
                      
                      <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        Your skills and experience stood out among many qualified candidates, and we're excited to have you join our team.
                      </p>
                      
                      <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        Our team will be in touch with you shortly with the next steps and onboarding details.
                      </p>
                      
                      <div style="margin: 30px 0; padding: 20px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3);">
                        <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
                          <strong style="color: #3b82f6;">Next Steps:</strong><br>
                          • Check your email for onboarding documents<br>
                          • Prepare any required documentation<br>
                          • Be ready for an amazing journey with us!
                        </p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background: rgba(139, 92, 246, 0.1); border-top: 1px solid rgba(139, 92, 246, 0.2);">
                      <p style="margin: 0 0 15px; font-size: 16px; color: #cbd5e1; font-weight: 500;">
                        Best regards,<br>
                        <span style="color: #8b5cf6; font-weight: 600;">The Nirikshan AI Team</span>
                      </p>
                      
                      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.2);">
                        <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.6;">
                          Nirikshan AI | Empowering Vision and Intelligence<br>
                          From OpenCV to Agentic AI
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
      : type === "interview"
      ? `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0118; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0118; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a0b2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);">
                  <!-- Header with gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Nirikshan AI</h1>
                      <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px; letter-spacing: 2px;">EMPOWERING VISION & INTELLIGENCE</p>
                    </td>
                  </tr>
                  
                  <!-- Interview Badge -->
                  <tr>
                    <td align="center" style="padding: 30px 40px 0;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 12px 30px; border-radius: 50px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">
                        <span style="color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 1px;">📅 INTERVIEW SCHEDULED</span>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 30px 40px; color: #e2e8f0;">
                      <h2 style="margin: 0 0 20px; color: #3b82f6; font-size: 28px; font-weight: 600;">Hello, ${candidateName}!</h2>
                      
                      <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        We have reviewed your application for the position of:
                      </p>
                      
                      <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 20px; margin: 20px 0; border-radius: 8px;">
                        <p style="margin: 0; font-size: 20px; font-weight: 600; color: #a78bfa;">${position}</p>
                      </div>
                      
                      <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        We would like to invite you for an interview! Our HR team will contact you shortly with the interview schedule and details.
                      </p>
                      
                      <div style="margin: 30px 0; padding: 20px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3);">
                        <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
                          <strong style="color: #3b82f6;">Prepare For:</strong><br>
                          • Technical discussion about your experience<br>
                          • Questions about your projects and skills<br>
                          • Ensure your contact information is up to date
                        </p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background: rgba(139, 92, 246, 0.1); border-top: 1px solid rgba(139, 92, 246, 0.2);">
                      <p style="margin: 0 0 15px; font-size: 16px; color: #cbd5e1; font-weight: 500;">
                        Best regards,<br>
                        <span style="color: #8b5cf6; font-weight: 600;">The Nirikshan AI Team</span>
                      </p>
                      
                      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.2);">
                        <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.6;">
                          Nirikshan AI | Empowering Vision and Intelligence<br>
                          From OpenCV to Agentic AI
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
      : `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0118; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0118; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a0b2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);">
                  <!-- Header with gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Nirikshan AI</h1>
                      <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px; letter-spacing: 2px;">EMPOWERING VISION & INTELLIGENCE</p>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px 40px; color: #e2e8f0;">
                      <h2 style="margin: 0 0 20px; color: #cbd5e1; font-size: 24px; font-weight: 600;">Dear ${candidateName},</h2>
                      
                      <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        Thank you for your interest in the position of:
                      </p>
                      
                      <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 20px; margin: 20px 0; border-radius: 8px;">
                        <p style="margin: 0; font-size: 18px; font-weight: 600; color: #a78bfa;">${position}</p>
                      </div>
                      
                      <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        We appreciate the time and effort you invested in the application process. After careful consideration of all candidates, we have decided to move forward with other applicants whose qualifications more closely match our current needs.
                      </p>
                      
                      <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        We were impressed by your background and encourage you to apply for future opportunities that align with your skills and experience.
                      </p>
                      
                      <div style="margin: 30px 0; padding: 20px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3);">
                        <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
                          <strong style="color: #3b82f6;">Stay Connected:</strong><br>
                          We invite you to follow our journey and explore future opportunities as we continue to grow and innovate in AI technology.
                        </p>
                      </div>
                      
                      <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #cbd5e1;">
                        We wish you the best in your job search and future career endeavors.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background: rgba(139, 92, 246, 0.1); border-top: 1px solid rgba(139, 92, 246, 0.2);">
                      <p style="margin: 0 0 15px; font-size: 16px; color: #cbd5e1; font-weight: 500;">
                        Best regards,<br>
                        <span style="color: #8b5cf6; font-weight: 600;">The Nirikshan AI Team</span>
                      </p>
                      
                      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.2);">
                        <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.6;">
                          Nirikshan AI | Empowering Vision and Intelligence<br>
                          From OpenCV to Agentic AI
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

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
