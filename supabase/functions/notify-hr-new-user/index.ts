import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewUserNotificationRequest {
  userEmail: string;
  signupTime: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, signupTime }: NewUserNotificationRequest = await req.json();

    console.log("Sending new user notification for:", userEmail);

    // HR email - you can change this to your actual HR email
    const hrEmail = Deno.env.get("HR_NOTIFICATION_EMAIL") || "ai.nirikshan@gmail.com";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1; }
          .label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { font-size: 16px; color: #1e293b; font-weight: 600; margin-top: 4px; }
          .cta-button { display: inline-block; background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
          .steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .step { margin-bottom: 12px; padding-left: 35px; position: relative; }
          .step-number { background: #6366f1; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; position: absolute; left: 0; top: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Employee Registration</h1>
          </div>
          <div class="content">
            <p>A new user has signed up and is waiting to be added as an employee.</p>
            
            <div class="info-box">
              <div class="label">Email Address</div>
              <div class="value">${userEmail}</div>
              <div style="margin-top: 15px;">
                <div class="label">Signup Time</div>
                <div class="value">${new Date(signupTime).toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</div>
              </div>
            </div>

            <div class="steps">
              <h3 style="margin-top: 0;">Next Steps:</h3>
              <div class="step">
                <span class="step-number">1</span>
                Go to the HR Management panel
              </div>
              <div class="step">
                <span class="step-number">2</span>
                Click on "Add Employee" button
              </div>
              <div class="step">
                <span class="step-number">3</span>
                Select this user from the dropdown
              </div>
              <div class="step">
                <span class="step-number">4</span>
                Fill in employee details (ID, department, etc.)
              </div>
            </div>

            <p style="text-align: center;">
              <a href="https://nirikshan-ai-spark.lovable.app/admin/hr?tab=employees" class="cta-button">
                Go to HR Management →
              </a>
            </p>
          </div>
          <div class="footer">
            <p>This is an automated notification from Nirikshan AI HR System.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Nirikshan AI <onboarding@resend.dev>",
        to: [hrEmail],
        subject: "🆕 New Employee Signup - Action Required",
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-hr-new-user function:", error);
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
