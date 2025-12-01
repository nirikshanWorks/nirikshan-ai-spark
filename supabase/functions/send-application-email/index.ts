import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  candidateName: string;
  position: string;
  type: "selection" | "rejection";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, candidateName, position, type }: EmailRequest = await req.json();

    console.log(`Sending ${type} email to ${to} for position: ${position}`);

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailPassword) {
      throw new Error("Gmail credentials not configured");
    }

    const subject = type === "selection" 
      ? `Congratulations! You've been selected for ${position}`
      : `Update on your application for ${position}`;

    const htmlContent = type === "selection"
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Congratulations, ${candidateName}!</h2>
          <p>We are pleased to inform you that you have been selected for the position of <strong>${position}</strong>.</p>
          <p>Our team will be in touch with you shortly with the next steps.</p>
          <p>Best regards,<br>Nirikshan AI Team</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Dear ${candidateName},</h2>
          <p>Thank you for your interest in the position of <strong>${position}</strong>.</p>
          <p>After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.</p>
          <p>We appreciate the time you invested in the application process and wish you the best in your job search.</p>
          <p>Best regards,<br>Nirikshan AI Team</p>
        </div>
      `;

    // Create email message in RFC 2822 format
    const emailContent = [
      `From: Nirikshan AI <${gmailUser}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=utf-8",
      "",
      htmlContent,
    ].join("\r\n");

    // Send via Gmail SMTP
    const smtpResponse = await fetch(
      `https://smtp.gmail.com:587`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`${gmailUser}:${gmailPassword}`)}`,
        },
        body: emailContent,
      }
    );

    // Alternative: Use Gmail API
    const auth = btoa(`${gmailUser}:${gmailPassword}`);
    const base64Email = btoa(emailContent).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    
    const gmailApiResponse = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw: base64Email,
        }),
      }
    );

    if (!gmailApiResponse.ok) {
      const errorText = await gmailApiResponse.text();
      console.error("Gmail API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    console.log(`${type} email sent successfully to ${to}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
