import { useEffect, useState } from "react";

import { useActivePostRelayStore } from "@/app/stores/activePostRelayStore";
import { useReadRelayStore } from "@/app/stores/readRelayStore";
import { useRelayStore } from "@/app/stores/relayStore";

import { useRelayInfoStore } from "../../stores/relayInfoStore";

export default function ReadRelayCards() {
  const { getRelay } = useRelayInfoStore();
  const [relayImgUrl, setRelayImgUrl] = useState("");
  const [relay, setRelay] = useState<any>();
  const { relayUrl: activeReadRelayUrl, setRelayUrl } = useRelayStore();
  const { activePostRelays, addActivePostRelay, removeActivePostRelay } = useActivePostRelayStore();
  const { readRelays, updateReadRelayStatus, sortReadRelays } = useReadRelayStore();

  // useEffect(() => {
  //   if (relayUrl === undefined) {
  //     console.log("relayUrl is undefined");
  //     return;
  //   }

  //   const cachedRelayInfo = getRelay(relayUrl);

  //   if (cachedRelayInfo === undefined) {
  //     console.log("cachedRelayInfo is undefined");
  //     return;
  //   }

  //   setRelay(cachedRelayInfo);

  //   const faviconUrl = relayUrl.replace("wss://", "https://").replace("relay.", "") + "/favicon.ico";
  //   setRelayImgUrl(faviconUrl);
  // }, []);

  // const handleSetReadActive = () => {
  //   console.log("Setting read active");
  //   setRelayUrl(relayUrl);
  // };

  // const handleAddPostActive = () => {
  //   addActivePostRelay(relayUrl);
  // };

  // const handleRemovePostActive = () => {
  //   removeActivePostRelay(relayUrl);
  // };

  // if (relay === undefined) {
  //   return <div>Relay is undefined</div>;
  // }

  return (
    <>
      {readRelays.map((relay) => (
        <li key={relay.url}>
          <div className="group relative flex items-center px-5 py-6">
            <div className="-m-1 block flex-1 p-1">
              <div className="absolute inset-0" aria-hidden="true" />
              <div className="relative flex min-w-0 flex-1 items-center">
                <span className="relative inline-block flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={relayImgUrl} alt="" />
                </span>
                <div className="ml-4 truncate">
                  {(currentTab === "Read From" && activeReadRelayUrl === relayUrl) ||
                  (currentTab === "Post To" && activePostRelays.includes(relayUrl)) ? (
                    <>
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">
                        <span>{relay.name}</span>
                        <span
                          className="z-20 inline-flex select-none items-center px-2 text-xs font-medium text-green-600 dark:text-green-400 dark:ring-green-500/20"
                          // className="z-20 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"
                        >
                          Active
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">{relay.name}</p>
                    </>
                  )}
                  <p className="truncate text-sm text-slate-500">{relay.contact}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {currentTab === "Read From" && activeReadRelayUrl !== relayUrl && (
                <button
                  onClick={handleSetReadActive}
                  className="z-20 inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:ring-blue-600/50 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:ring-blue-400/70"
                >
                  Set Active
                </button>
              )}
              {currentTab === "Post To" &&
                (activePostRelays.includes(relayUrl) ? (
                  <button
                    onClick={handleRemovePostActive}
                    className="z-20 inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:ring-red-500/50 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20 dark:hover:ring-red-400/60"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleAddPostActive}
                    className="z-20 inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:ring-blue-600/50 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:ring-blue-400/70"
                  >
                    Set Active
                  </button>
                ))}
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
