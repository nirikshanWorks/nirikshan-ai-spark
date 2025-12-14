import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AcceptRequest {
  token: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, email }: AcceptRequest = await req.json();

    console.log(`Accepting offer for email: ${email}, token: ${token}`);

    if (!token || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Token and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find and verify the application
    const { data: application, error: findError } = await supabase
      .from("job_applications")
      .select("id, name, email, job_applied_for, offer_accepted, acceptance_token")
      .eq("acceptance_token", token)
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (findError) {
      console.error("Database error:", findError);
      throw findError;
    }

    if (!application) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid token or email" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (application.offer_accepted === true) {
      return new Response(
        JSON.stringify({ success: false, error: "Offer has already been accepted" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Update the application to mark offer as accepted
    const { error: updateError } = await supabase
      .from("job_applications")
      .update({ 
        offer_accepted: true, 
        offer_accepted_at: new Date().toISOString(),
        status: "offer_accepted"
      })
      .eq("id", application.id);

    if (updateError) {
      console.error("Update error:", updateError);
      throw updateError;
    }

    console.log(`Offer accepted successfully by ${application.name} for ${application.job_applied_for}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Offer accepted successfully",
        name: application.name,
        position: application.job_applied_for
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error accepting offer:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to accept offer" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
