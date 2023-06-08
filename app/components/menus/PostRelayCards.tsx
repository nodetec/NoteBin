import { usePostRelayStore } from "@/app/stores/postRelayStore";
import { useRelayInfoStore } from "@/app/stores/relayInfoStore";

export default function ReadRelayCards() {
  const { getRelayInfo } = useRelayInfoStore();
  const { postRelays, updatePostRelayStatus, sortPostRelays, countActivePostRelays } = usePostRelayStore();

  // TODO: show paid

  const handleSetPostActive = (postRelay: any) => {
    // console.log("Setting read active");

    if (countActivePostRelays() === 5) {
      alert("You can only have 5 active post relays.");
      return;
    }

    updatePostRelayStatus(postRelay.url, true);
    // TODO: maybe sort relays on component unmount?
    sortPostRelays();
  };

  const handleRemovePostActive = (postRelay: any) => {
    // console.log("Setting read active");

    if (countActivePostRelays() === 1) {
      alert("You must have at least one active post relay.");
      return;
    }
    updatePostRelayStatus(postRelay.url, false);
    // TODO: maybe sort relays on component unmount?
    sortPostRelays();
  };

  return (
    <>
      <p className="px-4 py-2 dark:bg-smoke-800 dark:text-smoke-300">Choose up to 5 relays to post content to</p>
      <ul role="list" className="flex-1 divide-y divide-slate-200 overflow-y-auto dark:divide-smoke-500">
        {postRelays.map((postRelay) => (
          <li key={postRelay.url}>
            <div className="group relative flex items-center px-5 py-6">
              <div className="-m-1 block flex-1 p-1">
                <div className="absolute inset-0" aria-hidden="true" />
                <div className="relative flex min-w-0 flex-1 items-center">
                  <span className="relative inline-block flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={postRelay.url.replace("wss://", "https://").replace("relay.", "") + "/favicon.ico"}
                      alt=""
                    />
                  </span>
                  <div className="ml-4 truncate">
                    {postRelay.isActive && getRelayInfo(postRelay.url) ? (
                      <>
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">
                          <span>{getRelayInfo(postRelay.url).name}</span>
                          <span className="z-20 inline-flex select-none items-center px-2 text-xs font-medium text-green-600 dark:text-green-400 dark:ring-green-500/20">
                            Active
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">
                          {getRelayInfo(postRelay.url).name}
                        </p>
                      </>
                    )}
                    <p className="truncate text-sm text-slate-500">{getRelayInfo(postRelay.url).contact}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {postRelay.isActive ? (
                  <button
                    onClick={() => handleRemovePostActive(postRelay)}
                    className="z-20 inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:ring-red-500/50 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20 dark:hover:ring-red-400/60"
                  >
                    Set Inactive
                  </button>
                ) : (
                  <button
                    onClick={() => handleSetPostActive(postRelay)}
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
