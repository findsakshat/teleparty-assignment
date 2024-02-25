"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Nav() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("theme", "light");
    setTheme("light");
    changeTheme("light");
  }, []);

  const handleThemeToggleClick = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
      setTheme("dark")
      localStorage.setItem("theme", "dark");
      changeTheme("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      changeTheme("light");
    }
  }

  const changeTheme = (theme: string) => {
    if (typeof window !== "undefined") {
      const body = document.body;
      if (theme === "dark") {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    }
  }

  return (
    <nav className="flex justify-end items-center max-w-[900px] mx-auto px-4 pt-4">
      <button onClick={handleThemeToggleClick} className="p-2 hover:bg-gray-50 border rounded-md dark:hover:bg-gray-900 dark:text-gray-400">
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </nav>
  )
}