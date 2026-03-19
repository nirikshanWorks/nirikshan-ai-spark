import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Fallbacks (publishable) to prevent blank-screen when env injection fails.
const FALLBACK_SUPABASE_URL = "https://ggoqrdvlvapmcgonufds.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdnb3FyZHZsdmFwbWNnb251ZmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDM1NTEsImV4cCI6MjA4MDAxOTU1MX0.5e0PnzXKad0Ydb4tXF0KIjzpHXFKEGWkuzImDwDEIwY";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv reads .env* files and merges with process.env
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const supabaseKey =
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    FALLBACK_SUPABASE_PUBLISHABLE_KEY;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "three", "@react-three/fiber", "@react-three/drei"],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "three", "@react-three/fiber", "@react-three/drei"],
    },
    // Ensure these exist at build time (prevents `supabaseUrl is required`)
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(supabaseKey),
    },
  };
});

