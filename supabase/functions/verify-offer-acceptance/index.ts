import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyRequest {
  token: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, email }: VerifyRequest = await req.json();

    console.log(`Verifying offer acceptance for email: ${email}, token: ${token}`);

    if (!token || !email) {
      return new Response(
        JSON.stringify({ error: "Token and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the application with matching token and email
    const { data: application, error } = await supabase
      .from("job_applications")
      .select("id, name, email, job_applied_for, status, offer_accepted, acceptance_token")
      .eq("acceptance_token", token)
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    if (!application) {
      console.log("No application found with matching token and email");
      return new Response(
        JSON.stringify({ verified: false, error: "Invalid token or email. Please check your details and try again." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if already accepted
    if (application.offer_accepted === true) {
      console.log("Offer already accepted");
      return new Response(
        JSON.stringify({ 
          verified: false, 
          error: "already_accepted",
          name: application.name,
          position: application.job_applied_for,
          email: application.email
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Verified: ${application.name} for ${application.job_applied_for}`);

    return new Response(
      JSON.stringify({ 
        verified: true,
        name: application.name,
        position: application.job_applied_for,
        email: application.email
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error verifying offer acceptance:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to verify" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
