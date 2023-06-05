import { cookies } from "next/headers";
import Link from "next/link";

import { Theme } from "../../types";
import Login from "./Login";
import ThemeToggle from "./ThemeToggle";

// import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const theme = cookies().get("theme")?.value === "dark" ? Theme.dark : Theme.light;
  return (
    <header className="mb-7 flex items-center justify-between px-4 py-4 dark:border-smoke-600">
      <div className="flex items-center justify-center gap-4">
        <Link className="cursor-pointer" href="/">
          <div className="flex items-center justify-center gap-1">
            <svg className="h-7 w-7 dark:fill-smoke-100" viewBox="0 0 24 24">
              <path d="M19 5v9h-5v5H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10l6-6V5c0-1.1-.9-2-2-2zm-7 11H7v-2h5v2zm5-4H7V8h10v2z" />
            </svg>

            <h1 className="text-2xl font-semibold">
              <span className="font-mono text-gray-900 dark:text-smoke-50">note</span>
              <span className="font-mono font-light text-blue-500 dark:text-blue-400">bin</span>
            </h1>
          </div>
        </Link>
        <Link className="cursor-pointer text-sm hover:underline dark:text-smoke-300" href="/explore">
          Explore
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4">
        <ThemeToggle theme={theme} />
        <Login>
          <div className="flex flex-1 justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Log in <span aria-hidden="true">&rarr;</span>
              {/* <UserCircleIcon className="h-7 w-7 text-smoke-400" aria-hidden="true" /> */}
            </a>
          </div>
        </Login>
      </div>
    </header>
  );
}
