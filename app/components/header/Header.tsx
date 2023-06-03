import { UserCircleIcon } from "@heroicons/react/24/outline";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="mb-7 flex items-center justify-between px-4 py-4 dark:border-smoke-600">
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-1">
          <svg className="h-7 w-7 dark:fill-smoke-100" viewBox="0 0 24 24">
            <path d="M19 5v9h-5v5H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10l6-6V5c0-1.1-.9-2-2-2zm-7 11H7v-2h5v2zm5-4H7V8h10v2z" />
          </svg>

          <h1 className="text-2xl font-semibold">
            <span className="font-mono text-gray-900 dark:text-smoke-50">note</span>
            <span className="font-mono font-light text-blue-500 dark:text-blue-400">bin</span>
          </h1>
        </div>
        <div>
          <span className="font-mono text-sm dark:text-smoke-300">Explore</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <ThemeToggle />
        <UserCircleIcon className="h-7 w-7 text-smoke-400" aria-hidden="true" />
      </div>
    </header>
  );
}
