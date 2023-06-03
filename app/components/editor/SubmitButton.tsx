import { generatePrivateKey, getEventHash, getPublicKey, getSignature, relayInit } from 'nostr-tools'

import { useTextStore } from '../../stores/textStore'

export const SubmitButton = () => {
  const { text } = useTextStore()
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
    console.log('submit', text)
  }

  return (
    <button onClick={handleSubmit} className="mt-4 rounded bg-blue-500 px-3 py-[0.35rem] font-semibold text-sm text-slate-50 hover:bg-blue-700">
      Create public note
    </button>
  )
}
