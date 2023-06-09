import { useEffect, useState } from "react";

import { usePostRelayStore } from "@/app/stores/postRelayStore";
import { useReadRelayStore } from "@/app/stores/readRelayStore";
import { useRelayInfoStore } from "@/app/stores/relayInfoStore";
import { useRelayStore } from "@/app/stores/relayStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Fuse from "fuse.js";

import RelayIcon from "./RelayIcon";

const options = {
  includeScore: false,
  includeMatches: false,
  minMatchCharLength: 2,
  findAllMatches: true,
  threshold: 0.1,
  keys: ["name", "id", "description", "url", "contact"],
};

export default function RelayDiscover() {
  const { getRelayInfo, getAllRelayInfo, addRelayInfo } = useRelayInfoStore();

  const { postRelays, addPostRelay } = usePostRelayStore();
  const { readRelays, addReadRelay } = useReadRelayStore();

  const { allRelays } = useRelayStore();
  const [query, setQuery] = useState("");
  const [relaySearch, setRelaySearch] = useState<any>([]);

  function excludeItems(original: any[], exclude: any[]): any[] {
    const excludeUrls = exclude.map((item) => item.url);
    return original.filter((item) => !excludeUrls.includes(item.url));
  }

  const fuse = new Fuse(excludeItems(getAllRelayInfo(), [...postRelays, ...readRelays]), options);

  useEffect(() => {
    allRelays.forEach((relayUrl) => {
      const cachedRelayInfo = getRelayInfo(relayUrl);
      let relayHttpUrl = relayUrl.replace("wss://", "https://");
      if (cachedRelayInfo === undefined) {
        const getRelayInfo = async (url: string) => {
          try {
            const response = await fetch(url, {
              headers: {
                Accept: "application/nostr+json",
              },
            });
            const data = await response.json();
            addRelayInfo(relayUrl, data);
          } catch (error) {
            console.error(`Error fetching relay information: ${error}`);
          }
        };
        getRelayInfo(relayHttpUrl);
      } else {
        // console.log("Cached relay info:", cachedRelayInfo);
      }
    });
  }, [addRelayInfo, getRelayInfo]);

  useEffect(() => {
    const matchingRelays: any = fuse.search(query).slice(0, 300);
    setRelaySearch(matchingRelays);
  }, [query]);

  const handleAddRelay = (postRelay: any) => {
    addPostRelay(postRelay, true);
    addReadRelay(postRelay, true);
  };

  function SearchItem(relay: any) {
    return (
      <li key={relay.url}>
        <div className="group relative z-20 flex items-center px-5 py-6">
          <div className="-m-1 block flex-1 p-1">
            <div className="absolute inset-0" aria-hidden="true" />
            <div className="relative flex min-w-0 flex-1 items-center">
              <span className="relative inline-block flex-shrink-0">
                {relay.url && (
                  <RelayIcon
                    src={relay.url.replace("wss://", "https://").replace("relay.", "") + "/favicon.ico"}
                    fallback="https://user-images.githubusercontent.com/29136904/244441447-d6f64435-6155-4ffa-8574-fb221a3ad412.png"
                    alt=""
                  />
                )}
              </span>
              <div className="ml-4 truncate">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">{relay.name}</p>
                <p className="truncate text-sm text-slate-500">{relay.contact}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleAddRelay(relay.url)}
            className="z-20 inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:ring-blue-600/50 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:ring-blue-400/70"
          >
            Add
          </button>
        </div>
      </li>
    );
  }

  return (
    <>
      <div className="mx-4">
        <div className="relative mt-6 flex items-center ">
          <input
            type="search"
            name="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            id="search"
            placeholder="Search relays..."
            className="block w-full rounded-md border-0 py-4 pl-4 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-smoke-800 dark:text-smoke-100 dark:ring-smoke-500 dark:placeholder:text-smoke-400 sm:leading-6"
          />
          <div className="absolute inset-y-0 right-0 flex py-4 pr-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>
      <ul
        role="list"
        className="mt-6 flex-1 divide-y divide-slate-200 overflow-y-auto border-t border-slate-200 dark:divide-smoke-500 dark:border-smoke-500"
      >
        {relaySearch.length > 0
          ? relaySearch.map((relay: any) => SearchItem(relay.item))
          : excludeItems(getAllRelayInfo(), [...postRelays, ...readRelays]).map((relay: any) => SearchItem(relay))}
      </ul>
    </>
  );
}
