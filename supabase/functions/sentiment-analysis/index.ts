import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Please provide text to analyze." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content:
                "You are an AI sentiment analysis engine for campaign intelligence. Analyze the given text and return structured results.",
            },
            {
              role: "user",
              content: `Analyze the sentiment of the following text. Return your analysis:\n\n"${text}"`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_sentiment_analysis",
                description:
                  "Return the structured sentiment analysis results for the given text.",
                parameters: {
                  type: "object",
                  properties: {
                    overall_sentiment: {
                      type: "string",
                      enum: ["very_positive", "positive", "neutral", "negative", "very_negative"],
                      description: "The overall sentiment of the text.",
                    },
                    confidence: {
                      type: "number",
                      description: "Confidence score from 0 to 100.",
                    },
                    emotions: {
                      type: "object",
                      properties: {
                        joy: { type: "number", description: "0-100" },
                        anger: { type: "number", description: "0-100" },
                        fear: { type: "number", description: "0-100" },
                        sadness: { type: "number", description: "0-100" },
                        surprise: { type: "number", description: "0-100" },
                        trust: { type: "number", description: "0-100" },
                      },
                      required: ["joy", "anger", "fear", "sadness", "surprise", "trust"],
                      additionalProperties: false,
                    },
                    key_phrases: {
                      type: "array",
                      items: { type: "string" },
                      description: "Up to 5 key phrases that influenced the sentiment.",
                    },
                    summary: {
                      type: "string",
                      description: "A brief 1-2 sentence summary of the sentiment analysis.",
                    },
                    campaign_relevance: {
                      type: "string",
                      description:
                        "A brief insight on how this sentiment relates to campaign strategy.",
                    },
                  },
                  required: [
                    "overall_sentiment",
                    "confidence",
                    "emotions",
                    "key_phrases",
                    "summary",
                    "campaign_relevance",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "return_sentiment_analysis" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "AI analysis failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      return new Response(
        JSON.stringify({ error: "AI did not return structured results." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sentiment-analysis error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
