import { generatePrivateKey, getEventHash, getPublicKey, getSignature, relayInit } from "nostr-tools";

import { useTextStore } from "../../stores/textStore";
import RelayMenu from "../menus/RelayMenu";

export const SubmitButton = () => {
  const { text } = useTextStore();
  const handleSubmit = async () => {
    // const relay = relayInit("wss://nostr-pub.wellorder.net");
    // relay.on("connect", () => {
    //   console.log(`connected to ${relay.url}`);
    // });
    // relay.on("error", () => {
    //   console.log(`failed to connect to ${relay.url}`);
    // });

    // await relay.connect();

    // let privateKey = generatePrivateKey(); // `sk` is a hex string
    // // let publicKey = getPublicKey(sk); // `pk` is a hex string
    // let event = {
    //   kind: 1050,
    //   created_at: Math.floor(Date.now() / 1000),
    //   tags: [],
    //   content: text,
    //   pubkey: getPublicKey(privateKey),
    // };

    // console.log(event);

    // event.id = getEventHash(event);
    // event.sig = getSignature(event, privateKey);

    // console.log(event);

    // let pub = relay.publish(event);
    // pub.on("ok", () => {
    //   console.log(`${relay.url} has accepted our event`);
    // });
    // pub.on("failed", (reason) => {
    //   console.log(`failed to publish to ${relay.url}: ${reason}`);
    // });
    console.log("submit", text);
  };

  return (
    <div className="mt-4 flex gap-2 items-center justify-center">
      <RelayMenu>
        <div className="flex -space-x-2 overflow-hidden px-3 py-1">
          <img className="inline-block h-6 w-6 rounded-full ring-1 ring-smoke-300" src="https://damus.io/favicon.ico" alt="" />
          <img
            className="inline-block h-6 w-6 rounded-full ring-1 ring-smoke-300"
            src="https://nostr-pub.wellorder.net/favicon.ico"
            alt=""
          />
          <img className="inline-block h-6 w-6 rounded-full ring-1 ring-smoke-300" src="https://nos.lol//favicon.ico" alt="" />
          <img className="inline-block h-6 w-6 rounded-full ring-1 ring-smoke-300" src="https://snort.social/favicon.ico" alt="" />
          <img className="inline-block h-6 w-6 rounded-full ring-1 ring-smoke-300" src="https://nostr.wine//favicon.ico" alt="" />
        </div>
      </RelayMenu>
      <button
        onClick={handleSubmit}
        className="rounded bg-blue-600 px-3 py-[0.35rem] text-sm font-semibold text-slate-50 hover:bg-blue-500"
      >
        Create public note
      </button>
    </div>
  );
};
