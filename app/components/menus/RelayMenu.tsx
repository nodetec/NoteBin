import { Fragment, useEffect, useState } from "react";

import { useRelayInfoStore } from "@/app/stores/relayInfoStore";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { RELAYS } from "../../lib/constants";
import RelayCard from "./RelayCard";

const tabs = [
  { name: "Read From", href: "#", current: true },
  { name: "Post To", href: "#", current: false },
  // { name: "Settings", href: "#", current: false },
  // { name: "Discover", href: "#", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function RelayMenu({ children }: any) {
  const [open, setOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  const { addRelay, getRelay } = useRelayInfoStore();

  // get and store relay info for all relays eventually use relay list here

  // add refresh button

  useEffect(() => {
    RELAYS.forEach((relayUrl) => {
      const cachedRelayInfo = getRelay(relayUrl);
      let relayHttpUrl = relayUrl.replace("wss://", "https://");
      if (cachedRelayInfo === undefined) {
        console.log("wss URL", relayUrl);
        console.log("http URL", relayHttpUrl);
        const getRelayInfo = async (url: string) => {
          try {
            const response = await fetch(url, {
              headers: {
                Accept: "application/nostr+json",
              },
            });
            const data = await response.json();
            addRelay(relayUrl, data);
          } catch (error) {
            console.error(`Error fetching relay information: ${error}`);
          }
        };
        getRelayInfo(relayHttpUrl);
      } else {
        console.log("Cached relay info:", cachedRelayInfo);
      }
    });
  }, [addRelay, getRelay]);

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
                          <Dialog.Title className="text-base font-semibold leading-6 text-slate-900 dark:text-smoke-50">Relays</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-slate-400 hover:text-slate-500 dark:bg-smoke-700 dark:text-smoke-300 dark:hover:text-smoke-100"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-slate-200 dark:border-smoke-500">
                        <div className="px-6">
                          <nav className="-mb-px flex space-x-6" x-descriptions="Tab component">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  currentTab === tab.name
                                    ? "border-blue-300 text-blue-400 dark:border-blue-500 dark:text-blue-400"
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:hover:border-smoke-100 dark:text-smoke-400 dark:hover:text-smoke-100",
                                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                                )}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentTab(tab.name);
                                }}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                      <ul role="list" className="flex-1 divide-y divide-slate-200 overflow-y-auto dark:divide-smoke-500">
                        {RELAYS.map((relayUrl) => (
                          <RelayCard key={relayUrl} relayUrl={relayUrl} currentTab={currentTab} />
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
