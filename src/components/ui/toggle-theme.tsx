import { useId } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const SwitchToggleThemeDemo = () => {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={cn(
          "cursor-pointer transition-colors",
          !isDark ? "text-amber-500" : "text-muted-foreground"
        )}
        onClick={() => setTheme("light")}
      >
        <SunIcon size={16} strokeWidth={2} aria-hidden="true" />
      </span>

      <Switch
        id={id}
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />

      <span
        className={cn(
          "cursor-pointer transition-colors",
          isDark ? "text-indigo-400" : "text-muted-foreground"
        )}
        onClick={() => setTheme("dark")}
      >
        <MoonIcon size={16} strokeWidth={2} aria-hidden="true" />
      </span>
    </div>
  );
};

export default SwitchToggleThemeDemo;
