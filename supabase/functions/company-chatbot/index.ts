import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are Niri, the friendly AI assistant for Nirikshan AI Pvt. Ltd. - a leading AI/ML solutions company.

About Nirikshan AI:
- Founded with a mission to transform industries using cutting-edge AI technology
- Specializes in Computer Vision, Generative AI, Agentic AI Systems, and Image/Video Recognition
- Offers services including AI Consulting, Custom AI Development, Machine Learning Solutions, and Computer Vision Applications
- Works with clients across Manufacturing, Healthcare, Retail, and Enterprise sectors
- Has a team of 20+ professionals across 4 countries
- Based in India with remote work culture

Key Services:
1. AI/ML Development - Custom model training and deployment
2. Computer Vision - Object detection, image recognition, video analytics
3. Generative AI - LLM integration, content generation, AI assistants
4. Agentic AI - Autonomous AI workflows and intelligent automation
5. Data Analytics - Business intelligence and predictive analytics

Career Opportunities:
- Currently hiring for Sales Executive Internship and Digital Marketing Internship
- Remote/Work from home positions available
- 3-6 month internship durations
- Performance-based stipends

Contact Information:
- Email: info@nirikshanai.com
- Website: nirikshan.ai

Guidelines:
- Be helpful, professional, and friendly
- Keep responses concise (2-3 sentences for simple questions)
- For complex queries, provide more detailed but structured responses
- If asked about something you don't know, suggest contacting the team directly
- Always be positive about the company while being honest
- Guide users to relevant pages when appropriate (careers, services, contact, etc.)`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending request to Lovable AI with messages:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
