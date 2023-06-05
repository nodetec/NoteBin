import { Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const links = [
  { name: "Your Notes", href: "#" },
  { name: "Bookmarked Notes", href: "#" },
  { name: "Set Relays", href: "#" },
  // create faq page later
  // { name: "Help", href: "#" },
];

export default function Example({ children }: any) {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 ring-0 outline-none">
        {children}
        {/* <span>Solutions</span> */}
        <ChevronDownIcon className="h-5 w-5 text-smoke-200" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-2 flex w-screen max-w-min translate-x-4 px-4">
          <div className="w-48 shrink rounded-md border bg-white py-2 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 dark:border-smoke-500 dark:bg-smoke-700 dark:text-smoke-50">
            <a href={"#"} className="block px-4 pt-1 pb-2 mb-2 border-b border-smoke-500">
              <p className="font-normal">{"Signed in as"}</p>
              <p>{"Christian Chiarulli"}</p>
            </a>
            {links.map((item) => (
              <a key={item.name} href={item.href} className="block px-4 py-1 hover:bg-blue-600">
                {item.name}
              </a>
            ))}
            <div className="border-t border-smoke-500 mt-2" />
            <a href={"#"} className="block px-4 py-1 mt-2 hover:bg-blue-600">
              <p>{"Sign out"}</p>
            </a>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
