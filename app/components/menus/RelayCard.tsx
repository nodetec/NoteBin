import { useEffect, useState } from "react";

import { useRelayStore } from "@/app/stores/relayStore";

import { useRelayInfoStore } from "../../stores/relayInfoStore";

// { name: "Read From", href: "#", current: true },
// { name: "Post To", href: "#", current: false },
// { name: "All", href: "#", current: false },
// { name: "Discover", href: "#", current: false },

interface Props {
  relayUrl: string;
  currentTab: string;
}

export default function RelayCard({ relayUrl, currentTab }: Props) {
  const { getRelay } = useRelayInfoStore();
  const [relayImgUrl, setRelayImgUrl] = useState("");
  const [relay, setRelay] = useState<any>();
  const { relayUrl: activeReadRelayUrl, setRelayUrl } = useRelayStore();
  const activePostUrls = ["wss://relay.snort.social/", "wss://nos.lol", "wss://nostr-pub.wellorder.net"];

  useEffect(() => {
    if (relayUrl === undefined) {
      console.log("relayUrl is undefined");
      return;
    }

    const cachedRelayInfo = getRelay(relayUrl);

    if (cachedRelayInfo === undefined) {
      console.log("cachedRelayInfo is undefined");
      return;
    }

    setRelay(cachedRelayInfo);

    const faviconUrl = relayUrl.replace("wss://", "https://").replace("relay.", "") + "/favicon.ico";
    setRelayImgUrl(faviconUrl);
  }, []);

  const handleSetReadActive = () => {
    console.log("Setting read active");
    setRelayUrl(relayUrl);
  }

  if (relay === undefined) {
    return <div>Relay is undefined</div>;
  }

  return (
    <li key={relayUrl}>
      <div className="group relative flex items-center px-5 py-6">
        <div className="-m-1 block flex-1 p-1">
          <div className="absolute inset-0" aria-hidden="true" />
          <div className="relative flex min-w-0 flex-1 items-center">
            <span className="relative inline-block flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={relayImgUrl} alt="" />
            </span>
            <div className="ml-4 truncate">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-smoke-100">{relay.name}</p>
              <p className="truncate text-sm text-gray-500">{relay.contact}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {currentTab === "Read From" &&
            (activeReadRelayUrl === relayUrl ? (
              <button className="z-20 inline-flex items-center rounded-md bg-green-50 dark:bg-green-500/10 px-3 py-2 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/20">
                Active
              </button>
            ) : (
              <button onClick={handleSetReadActive} className="z-20 inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-400/10 px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/30">
                Set Active
              </button>
            ))}
          {currentTab === "Post To" &&
            (activePostUrls.includes(relayUrl) ? (
              <button className="z-20 inline-flex items-center rounded-md bg-green-50 dark:bg-green-500/10 px-3 py-2 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/20">
                Active
              </button>
            ) : (
              <button className="z-20 inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-400/10 px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/30">
                Set Active
              </button>
            ))}
        </div>
      </div>
    </li>
  );
}
