import { useEffect, useState } from "react";
import { IconButton } from "../park/ui/icon-button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {}

export function ThemeToggle({}: ThemeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  return (
    <div className="flex flex-col items-center justify-center ">
      <IconButton variant="ghost" onClick={() => setIsDarkMode(!isDarkMode)}>
        {/* {isDarkMode ? "☀️" : "🌙"} */}
        {isDarkMode ? <Sun /> : <Moon />}
      </IconButton>
    </div>
  );
}
