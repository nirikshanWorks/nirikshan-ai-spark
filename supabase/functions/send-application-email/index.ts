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
  acceptanceToken?: string;
  siteUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, candidateName, position, type, interviewDate, interviewTime, meetLink, acceptanceToken, siteUrl }: EmailRequest = await req.json();
    
    console.log(`Sending ${type} email to ${to} for ${candidateName}`);
    console.log(`Interview details - Date: "${interviewDate}", Time: "${interviewTime}", Meet: "${meetLink}"`);
    console.log(`Acceptance token: ${acceptanceToken}, Site URL: ${siteUrl}`);


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
      const acceptanceUrl = acceptanceToken && siteUrl 
        ? `${siteUrl}/accept-offer?token=${acceptanceToken}`
        : null;
      
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
              ${acceptanceUrl ? `
              <div style="background:#f0fdf4; border:1px solid #22c55e; border-radius:8px; padding:20px; margin:20px 0; text-align:center;">
                <h3 style="color:#16a34a; margin:0 0 10px; font-size:16px;">🎯 Accept Your Offer</h3>
                <p style="color:#555; margin:0 0 15px; font-size:14px;">Please click the button below to accept your offer and confirm your joining.</p>
                <a href="${acceptanceUrl}" style="display:inline-block; background:linear-gradient(135deg,#22c55e,#16a34a); color:#fff; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:bold; font-size:16px;">Accept Offer</a>
                <p style="color:#888; font-size:12px; margin-top:15px;">Or copy this link: ${acceptanceUrl}</p>
              </div>
              ` : ''}
              <p style="color:#555; line-height:1.6;">
                Our team will contact you shortly with onboarding details and next steps after you accept the offer.
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
      subject = `📅 Round 1 Interview Scheduled - ${position} at Nirikshan AI`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <body style="margin:0; padding:20px; font-family:Arial, sans-serif; background:#f5f5f5;">
          <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#8b5cf6,#3b82f6); padding:30px; text-align:center;">
              <h1 style="color:#fff; margin:0; font-size:24px;">Nirikshan AI Pvt. Ltd.</h1>
            </div>
            <div style="padding:30px;">
              <div style="text-align:center; margin-bottom:20px;">
                <span style="background:#3b82f6; color:#fff; padding:8px 20px; border-radius:20px; font-size:14px;">📅 INTERVIEW SCHEDULED</span>
              </div>
              <h2 style="color:#333; margin:0 0 15px;">Hello, ${candidateName}!</h2>
              <p style="color:#555; line-height:1.6;">
                We have reviewed your application for <strong>${position}</strong> and would like to invite you for Round 1 Interview!
              </p>
              
              <div style="background:#f0f7ff; border:1px solid #3b82f6; border-radius:8px; padding:20px; margin:20px 0;">
                <h3 style="color:#3b82f6; margin:0 0 15px; font-size:16px;">📋 Round 1 Interview Details</h3>
                <p style="color:#333; margin:8px 0;"><strong>📍 Organization:</strong> Nirikshan AI Pvt. Ltd.</p>
                <p style="color:#333; margin:8px 0;"><strong>📅 Date:</strong> ${interviewDate || 'To be confirmed'}</p>
                <p style="color:#333; margin:8px 0;"><strong>⏰ Time:</strong> ${interviewTime || 'To be confirmed'}</p>
                <p style="color:#333; margin:8px 0;"><strong>💻 Mode:</strong> Google Meet (Online)</p>
                ${meetLink ? `<p style="color:#333; margin:15px 0 5px;"><strong>🔗 Join Link:</strong></p>
                <a href="${meetLink.startsWith('http') ? meetLink : 'https://' + meetLink}" style="display:inline-block; background:#22c55e; color:#fff; padding:12px 24px; border-radius:5px; text-decoration:none; margin-top:5px; font-weight:bold;">Join Meeting</a>
                <p style="color:#666; font-size:12px; margin-top:8px;">${meetLink}</p>` : ''}
              </div>

              <div style="background:#fff8e6; border:1px solid #f59e0b; border-radius:8px; padding:15px; margin:20px 0;">
                <p style="color:#b45309; margin:0; font-weight:bold;">⏱️ Important Notice</p>
                <p style="color:#555; margin:10px 0 0; line-height:1.5;">We request you to join <strong>30 minutes before</strong> your expected slot for smooth verification and to avoid last-moment delays.</p>
              </div>
              
              <div style="background:#f8fafc; border-radius:8px; padding:20px; margin:20px 0;">
                <h3 style="color:#333; margin:0 0 15px; font-size:16px;">🎯 What Will Happen in Round 1?</h3>
                <p style="color:#555; line-height:1.6; margin:0 0 10px;">You will go through a short and interactive session covering:</p>
                <ul style="color:#555; line-height:1.8; margin:0; padding-left:20px;">
                  <li>A quick self-introduction</li>
                  <li>Communication assessment</li>
                  <li>Basic aptitude & reasoning questions</li>
                  <li>Understanding your interest in the role</li>
                </ul>
                <p style="color:#555; line-height:1.6; margin:15px 0 0; font-style:italic;">This round helps us get to know you better and evaluate your clarity, confidence, and thinking approach.</p>
              </div>

              <div style="background:#f0fdf4; border:1px solid #22c55e; border-radius:8px; padding:20px; margin:20px 0;">
                <h3 style="color:#16a34a; margin:0 0 15px; font-size:16px;">✔ A Few Pointers Before You Join</h3>
                <ul style="color:#555; line-height:1.8; margin:0; padding-left:20px;">
                  <li>Ensure a stable internet connection</li>
                  <li>Keep your camera & mic ready</li>
                  <li>Be in a quiet, disturbance-free space</li>
                  <li>Have a notepad and pen with you</li>
                </ul>
              </div>

              <p style="color:#555; line-height:1.6; text-align:center; font-weight:bold; margin:25px 0;">
                We're looking forward to meeting you and understanding your potential.<br>
                <span style="color:#8b5cf6; font-size:18px;">All the best! 🌟</span>
              </p>
              
              <p style="color:#555; margin-top:25px;">
                Warm regards,<br><strong style="color:#8b5cf6;">Nirikshan AI Pvt. Ltd.</strong>
              </p>
            </div>
            <div style="background:#f8f9fa; padding:15px; text-align:center; border-top:1px solid #eee;">
              <p style="color:#888; font-size:12px; margin:0;">Nirikshan AI Pvt. Ltd. | Empowering Vision and Intelligence</p>
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
