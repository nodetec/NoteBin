import { useEffect, useState } from "react";

import { useRelayInfoStore } from "@/app/stores/relayInfoStore";
import { useRelayStore } from "@/app/stores/relayStore";

interface Props {
  relayUrl: string;
  currentTab: string;
}

export default function RelayCard({ relayUrl }: Props) {
  const { getRelay } = useRelayInfoStore();
  const [relayImgUrl, setRelayImgUrl] = useState("");
  const [relay, setRelay] = useState<any>();
  const { relayUrl: activeRelayUrl } = useRelayStore();

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

  if (relay === undefined) {
    return <div>Relay is undefined</div>;
  }

  return (
    <>
      {activeRelayUrl === relayUrl ? (
        <button className="inline-flex items-center rounded-md bg-green-500/10 px-3 py-2 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
          Active
        </button>
      ) : (
        <button className="inline-flex items-center rounded-md bg-blue-400/10 px-3 py-2 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">
          Set Active
        </button>
      )}
    </>
  );
}
