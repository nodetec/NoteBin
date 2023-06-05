import { Fragment, useState } from "react";

import { Dialog, Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

const tabs = [
  { name: "Read From", href: "#", current: true },
  { name: "Post To", href: "#", current: false },
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
                      <ul role="list" className="flex-1 divide-y divide-gray-200 dark:divide-smoke-500 overflow-y-auto">
                        {team.map((person) => (
                          <li key={person.handle}>
                            <div className="group relative flex items-center px-5 py-6">
                              <a href={person.href} className="-m-1 block flex-1 p-1">
                                <div className="absolute inset-0 group-hover:bg-gray-50 dark:group-hover:bg-smoke-600" aria-hidden="true" />
                                <div className="relative flex min-w-0 flex-1 items-center">
                                  <span className="relative inline-block flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                                    <span
                                      className={classNames(
                                        person.status === "online" ? "bg-green-400" : "bg-gray-300",
                                        "absolute right-0 top-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <div className="ml-4 truncate">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-smoke-100">{person.name}</p>
                                    <p className="truncate text-sm text-gray-500">{"@" + person.handle}</p>
                                  </div>
                                </div>
                              </a>
                              <Menu as="div" className="relative ml-2 inline-block flex-shrink-0 text-left">
                                <Menu.Button className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none dark:bg-smoke-700">
                                  <span className="sr-only">Open options menu</span>
                                  <span className="flex h-full w-full items-center justify-center rounded-full">
                                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                  </span>
                                </Menu.Button>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-9 top-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                              "block px-4 py-2 text-sm"
                                            )}
                                          >
                                            View profile
                                          </a>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                              "block px-4 py-2 text-sm"
                                            )}
                                          >
                                            Send message
                                          </a>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          </li>
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
