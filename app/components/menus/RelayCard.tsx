import { Fragment, useEffect } from "react";

import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function RelayCard({ relay }: any) {
  useEffect(() => {
    console.log("relay", relay);
  }, []);

  return (
    <li key={relay.handle}>
      <div className="group relative flex items-center px-5 py-6">
        <a href={relay.href} className="-m-1 block flex-1 p-1">
          <div className="absolute inset-0 group-hover:bg-gray-50 dark:group-hover:bg-smoke-600" aria-hidden="true" />
          <div className="relative flex min-w-0 flex-1 items-center">
            <span className="relative inline-block flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={relay.imageUrl} alt="" />
            </span>
            <div className="ml-4 truncate">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-smoke-100">{relay.name}</p>
              <p className="truncate text-sm text-gray-500">{"@" + relay.handle}</p>
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
                    <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                      View profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
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
  );
}
