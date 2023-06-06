import { Fragment, useEffect, useState } from "react";

import { useRelayStore } from "@/app/stores/relayStore";
import { useUserProfileStore } from "@/app/stores/userProfileStore";
import { Profile } from "@/app/types";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const links = [
  { name: "Your Notes", href: "#" },
  { name: "Bookmarked Notes", href: "#" },
  { name: "Set Relays", href: "#" },
  // create faq page later https://github.com/vercel/next.js/discussions/17443
  // { name: "Help", href: "#" },
];

export default function Example({ children }: any) {
  const { activeRelay, relayUrl } = useRelayStore();
  const { getUserProfile, clearUserProfile, setUserPublicKey } = useUserProfileStore();
  const [currentProfile, setCurrentProfile] = useState<Profile>();
  useEffect(() => {
    if (currentProfile && currentProfile.relay === relayUrl) {
      return;
    }
    const cachedProfile = getUserProfile(relayUrl);

    if (cachedProfile) {
      setCurrentProfile(cachedProfile);
      return;
    }
  }, [relayUrl, activeRelay]);

  const signOut = async () => {
    clearUserProfile();
    setUserPublicKey("");
  };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none ring-0">
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
          <div className="w-48 shrink rounded-md border bg-white py-2 text-sm font-semibold leading-6 text-slate-700 shadow-lg ring-1 ring-gray-900/5 dark:border-smoke-500 dark:bg-smoke-700 dark:text-smoke-50">
            <a href={"#"} className="mb-2 block border-b border-slate-200  px-4 pb-2 pt-1 dark:border-smoke-500">
              <p className="font-normal">{"Signed in as"}</p>
              {currentProfile && currentProfile.name && <p>{currentProfile.name}</p>}
            </a>
            {links.map((item) => (
              <a key={item.name} href={item.href} className="block px-4 py-1 hover:bg-blue-200 dark:hover:bg-blue-600">
                {item.name}
              </a>
            ))}
            <div className="mt-2 border-t border-slate-200 dark:border-smoke-500" />
            <span onClick={signOut} className="mt-2 block cursor-pointer px-4 py-1 hover:bg-blue-200 dark:hover:bg-blue-600">
              <p>{"Sign out"}</p>
            </span>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
