import { useReadRelayStore } from "@/app/stores/readRelayStore";
import { useRelayStore } from "@/app/stores/relayStore";

import { useRelayInfoStore } from "../../stores/relayInfoStore";

export default function ReadRelayCards() {
  const { getRelayInfo } = useRelayInfoStore();
  const { setRelayUrl } = useRelayStore();
  const { readRelays, updateReadRelayStatus, sortReadRelays, setAllReadRelaysInactive } = useReadRelayStore();

  const handleSetReadActive = (readRelay: any) => {
    console.log("Setting read active");
    setRelayUrl(readRelay.url);
    setAllReadRelaysInactive();
    updateReadRelayStatus(readRelay.url, true);
    // TODO: maybe sort relays on component unmount?
    sortReadRelays();
  };

  return (
    <>
      <p className="px-4 py-2 dark:bg-smoke-800 dark:text-smoke-300">Choose a relay to read content from</p>
      <ul role="list" className="flex-1 divide-y divide-slate-200 overflow-y-auto dark:divide-smoke-500">
        {readRelays.map((readRelay) => (
          <li key={readRelay.url}>
            <div className="group relative flex items-center px-5 py-6">
              <div className="-m-1 block flex-1 p-1">
                <div className="absolute inset-0" aria-hidden="true" />
                <div className="relative flex min-w-0 flex-1 items-center">
                  <span className="relative inline-block flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={readRelay.url.replace("wss://", "https://").replace("relay.", "") + "/favicon.ico"}
                      alt=""
                    />
                  </span>
                  <div className="ml-4 truncate">
                    {readRelay.isActive && getRelayInfo(readRelay.url) ? (
                      <>
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">
                          <span>{getRelayInfo(readRelay.url).name}</span>
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
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">
                          {getRelayInfo(readRelay.url).name}
                        </p>
                      </>
                    )}
                    <p className="truncate text-sm text-slate-500">{getRelayInfo(readRelay.url).contact}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {!readRelay.isActive && (
                  <button
                    onClick={() => handleSetReadActive(readRelay)}
                    className="z-20 inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:ring-blue-600/50 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:ring-blue-400/70"
                  >
                    Set Active
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
