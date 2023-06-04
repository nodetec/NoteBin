"use client";

import { useState } from "react";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { Theme } from "../../types";

interface Props {
  theme: Theme;
}

export default function ThemeToggle({ theme }: Props) {
  const [_theme, setTheme] = useState<Theme>(theme);

  const toggleTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle(Theme.dark);
    if (root.classList.contains(Theme.dark)) {
      setTheme(Theme.dark);
      document.cookie = `theme=${Theme.dark}`;
    } else {
      setTheme(Theme.light);
      document.cookie = `theme=${Theme.light}`;
    }
  };

  return (
    <>
      <button className="hidden outline-none focus:ring-0 sm:block" onClick={toggleTheme}>
        {_theme === Theme.light ? (
          <SunIcon className="h-5 w-5 text-orange-500" aria-hidden="true" />
        ) : (
          <MoonIcon className="h-5 w-5 text-purple-500" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
