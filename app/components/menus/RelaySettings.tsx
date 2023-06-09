import { Fragment, useEffect, useState } from "react";

import { usePostRelayStore } from "@/app/stores/postRelayStore";
import { useReadRelayStore } from "@/app/stores/readRelayStore";
import { useRelayStore } from "@/app/stores/relayStore";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import { useRelayInfoStore } from "../../stores/relayInfoStore";
import RelayIcon from "./RelayIcon";

export default function RelaySettings() {
  const { getRelayInfo } = useRelayInfoStore();
  const { allRelays, relayUrl } = useRelayStore();
  const { readRelays, addReadRelay, removeReadRelay } = useReadRelayStore();
  const { postRelays, countActivePostRelays, addPostRelay, removePostRelay, checkPostRelayStatus } = usePostRelayStore();
  const [activeRelays, setActiveRelays] = useState<any[]>([]);

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  const handleAddReadRelay = (readRelay: any) => {
    console.log("Setting read relay");
    addReadRelay(readRelay, false);
  };

  const handleRemoveReadRelay = (readRelay: any) => {
    console.log("Setting read relay");

    if (readRelays.length === 1) {
      alert("You must have at least one read relay.");
      return;
    }

    if (readRelay === relayUrl) {
      alert("Cannot remove active relay.");
      return;
    }

    if (!postRelays.map((relay) => relay.url).includes(readRelay)) {
      alert("Must be either a read or post relay, consider removing this relay.");
      return;
    }

    removeReadRelay(readRelay);
  };

  const handleAddPostRelay = (postRelay: any) => {
    console.log("Setting post relay");
    addPostRelay(postRelay, false);
  };

  const handleRemovePostRelay = (postRelay: any) => {
    console.log("Setting post relay");

    if (postRelays.length === 1) {
      alert("You must have at least one read relay.");
      return;
    }

    if (!readRelays.map((relay) => relay.url).includes(postRelay)) {
      alert("Must be either a read or post relay, consider removing this relay.");
      return;
    }

    // check if this is the last active post relay
    if (countActivePostRelays() === 1 && checkPostRelayStatus(postRelay)) {
      alert("You must have at least one active post relay.");
      return;
    }

    removePostRelay(postRelay);
  };

  useEffect(() => {
    let activeRelays = [...postRelays, ...readRelays];
    const urlSet = new Set();
    const uniqueActiveRelays = activeRelays.filter((relay) => {
      console.log("relay", relay);
      const duplicate = urlSet.has(relay.url);
      urlSet.add(relay.url);
      return !duplicate;
    });
    console.log("uniqueActiveRelays", uniqueActiveRelays);
    setActiveRelays(uniqueActiveRelays);
  }, []);

  // const fuse = new Fuse(excludeItems(getAllRelayInfo(), [...postRelays, ...readRelays]), options);

  return (
    <>
      <p className="px-4 py-2 dark:bg-smoke-800 dark:text-smoke-300">Determine what each relay will be used for</p>
      <ul role="list" className="flex-1 divide-y divide-slate-200 overflow-y-auto dark:divide-smoke-500">
        {activeRelays.map((relay) => (
          <li key={relay.url}>
            <div className="group relative flex items-center px-5 py-6">
              <div className="-m-1 block flex-1 p-1">
                <div className="absolute inset-0" aria-hidden="true" />
                <div className="relative flex min-w-0 flex-1 items-center">
                  <span className="relative inline-block flex-shrink-0">
                    <RelayIcon
                      src={relay.url.replace("wss://", "https://").replace("relay.", "") + "/favicon.ico"}
                      fallback="https://user-images.githubusercontent.com/29136904/244441447-d6f64435-6155-4ffa-8574-fb221a3ad412.png"
                      alt=""
                    />
                  </span>
                  <div className="ml-4 truncate">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">{getRelayInfo(relay.url).name}</p>
                    <p className="truncate text-sm text-slate-500">{getRelayInfo(relay.url).contact}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {readRelays.map((relay) => relay.url).includes(relay.url) ? (
                  <button
                    onClick={() => handleRemoveReadRelay(relay.url)}
                    className="z-20 inline-flex items-center rounded-md bg-green-50 px-3 py-2  text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/30 hover:ring-green-600/60 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20 dark:hover:ring-green-500/50"
                  >
                    Read
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddReadRelay(relay.url)}
                    className="z-20 inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20 hover:ring-gray-500/40 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20 dark:hover:ring-gray-400/50"
                  >
                    Read
                  </button>
                )}
                {postRelays.map((relay) => relay.url).includes(relay.url) ? (
                  <button
                    onClick={() => handleRemovePostRelay(relay.url)}
                    className="z-20 inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/30 hover:ring-green-600/60 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20 dark:hover:ring-green-500/50"
                  >
                    Post
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddPostRelay(relay.url)}
                    className="z-20 inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20 hover:ring-gray-500/40 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20 dark:hover:ring-gray-400/50"
                  >
                    Post
                  </button>
                )}
              </div>

              <Menu as="div" className="relative z-40 ml-2 inline-block flex-shrink-0 text-left">
                <Menu.Button className="group relative inline-flex h-8 w-8 items-center justify-center focus:outline-none">
                  <span className="sr-only">Open options menu</span>
                  <span className="flex h-full w-full items-center justify-center rounded-full">
                    <EllipsisVerticalIcon
                      className="h-5 w-5 text-gray-400 dark:text-smoke-300 dark:hover:text-smoke-200"
                      aria-hidden="true"
                    />
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
                            className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                          >
                            Relay Info
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                          >
                            Remove Relay
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
    </>
  );
}
