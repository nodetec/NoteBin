import { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import RelayCard from "./RelayCard";

const tabs = [
  { name: "Read From", href: "#", current: true },
  { name: "Post To", href: "#", current: false },
  { name: "Discover", href: "#", current: false },
];
const team = [
  {
    name: "Damus",
    handle: "relay.damus.io",
    href: "#",
    imageUrl: "https://damus.io/favicon.ico",
    status: "online",
  },
  {
    name: "Wellorder",
    handle: "relay.wellorder.io",
    href: "#",
    imageUrl: "https://nostr-pub.wellorder.net/favicon.ico",
    status: "online",
  },
  {
    name: "Lol",
    handle: "relay.lol.io",
    href: "#",
    imageUrl: "https://nos.lol//favicon.ico",
    status: "online",
  },
  {
    name: "Snore",
    handle: "relay.snort.io",
    href: "#",
    imageUrl: "https://snort.social/favicon.ico",
    status: "online",
  },
  {
    name: "Wine",
    handle: "relay.wine.io",
    href: "#",
    imageUrl: "https://nostr.wine//favicon.ico",
    status: "online",
  },
];

// current active relay
//// show relay
// your relays
//// show the relays you saved
// add relay

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function RelayMenu({ children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="">
        {children}
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-smoke-700">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 dark:text-smoke-50">Relays</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 dark:bg-smoke-700 dark:text-smoke-300 dark:hover:text-smoke-200"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 dark:border-smoke-500">
                        <div className="px-6">
                          <nav className="-mb-px flex space-x-6" x-descriptions="Tab component">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  tab.current
                                    ? "border-blue-300 text-blue-400"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                      <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto dark:divide-smoke-500">
                        {team.map((person) => (
                          <RelayCard relay={person} />
                        ))}
                      </ul>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
