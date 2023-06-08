import { useEffect, useState } from "react";

import { useRelayInfoStore } from "@/app/stores/relayInfoStore";
import { useRelayStore } from "@/app/stores/relayStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Fuse from "fuse.js";

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["title", "description"],
};

export default function RelayDiscover() {
  const { getRelayInfo, getAllRelayInfo, addRelayInfo, relayInfoRecord } = useRelayInfoStore();
  const { allRelays } = useRelayStore();
  const [query, setQuery] = useState("");
  const [relaySearch, setRelaySearch] = useState<any>([]);
  const fuse = new Fuse(getAllRelayInfo(), options);

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
            // data.url = relayUrl;
            addRelayInfo(relayUrl, data);
          } catch (error) {
            console.error(`Error fetching relay information: ${error}`);
          }
        };
        getRelayInfo(relayHttpUrl);
      } else {
        console.log("Cached relay info:", cachedRelayInfo);
      }
    });
  }, [addRelayInfo, getRelayInfo]);

  useEffect(() => {
    // console.log("fuse", fuse);
    const posts: any = fuse
      .search(query)
      // .map((result) => result.item)
      .slice(0, 30);
    setRelaySearch(posts);
    console.log("posts", posts);
  }, [query]);

  // useEffect(() => {
  //   console.log("allRelay INFO", getAllRelayInfo());
  //   const fuse = new Fuse(getAllRelayInfo(), {
  //     keys: ["name", "description"],
  //   });
  //   // console.log("relayInfoRecord", relayInfoRecord);
  // }, []);

  function SearchItem(relay: any) {
    return (
      <li key={relay.name}>
        <div className="group relative flex items-center px-5 py-6">
          <div className="-m-1 block flex-1 p-1">
            <div className="absolute inset-0" aria-hidden="true" />
            <div className="relative flex min-w-0 flex-1 items-center">
              <span className="relative inline-block flex-shrink-0">
                {relay.url && (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={relay.url.replace("wss://", "https://").replace("relay.", "") + "/favicon.ico"}
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
            placeholder="Search for a relay..."
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
          : getAllRelayInfo().map((relay: any) => SearchItem(relay))}
      </ul>
    </>
  );
}
