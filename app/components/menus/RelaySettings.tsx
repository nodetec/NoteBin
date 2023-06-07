import { usePostRelayStore } from "@/app/stores/postRelayStore";
import { useReadRelayStore } from "@/app/stores/readRelayStore";
import { useRelayStore } from "@/app/stores/relayStore";

import { useRelayInfoStore } from "../../stores/relayInfoStore";

export default function RelaySettings() {
  const { getRelayInfo } = useRelayInfoStore();
  const { allRelays, relayUrl } = useRelayStore();
  const { readRelays, addReadRelay, removeReadRelay } =
    useReadRelayStore();
  const { postRelays, countActivePostRelays, addPostRelay, removePostRelay, checkPostRelayStatus } =
    usePostRelayStore();

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

  return (
    <>
      {allRelays.map((relay) => (
        <li key={relay}>
          <div className="group relative flex items-center px-5 py-6">
            <div className="-m-1 block flex-1 p-1">
              <div className="absolute inset-0" aria-hidden="true" />
              <div className="relative flex min-w-0 flex-1 items-center">
                <span className="relative inline-block flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={relay.replace("wss://", "https://").replace("relay.", "") + "/favicon.ico"}
                    alt=""
                  />
                </span>
                <div className="ml-4 truncate">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-smoke-100">{getRelayInfo(relay).name}</p>
                  <p className="truncate text-sm text-slate-500">{getRelayInfo(relay).contact}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              {readRelays.map((relay) => relay.url).includes(relay) ? (
                <button
                  onClick={() => handleRemoveReadRelay(relay)}
                  className="z-20 inline-flex items-center rounded-md bg-green-500/10 px-3 py-2 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20"
                >
                  Read
                </button>
              ) : (
                <button
                  onClick={() => handleAddReadRelay(relay)}
                  className="z-20 inline-flex items-center rounded-md bg-gray-400/10 px-3 py-2 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
                >
                  Read
                </button>
              )}
              <div className="flex gap-6">
                {postRelays.map((relay) => relay.url).includes(relay) ? (
                  <button
                    onClick={() => handleRemovePostRelay(relay)}
                    className="z-20 inline-flex items-center rounded-md bg-green-500/10 px-3 py-2 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20"
                  >
                    Post
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddPostRelay(relay)}
                    className="z-20 inline-flex items-center rounded-md bg-gray-400/10 px-3 py-2 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
