import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function RelayDiscover() {
  return (
    <div className="mx-4">
      <div className="relative mt-6 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for a relay..."
          className="block w-full rounded-md border-0 py-4 pl-4 pr-14 text-gray-900 dark:placeholder:text-smoke-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-smoke-800 dark:text-smoke-100 dark:ring-smoke-500 sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-4 pr-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
