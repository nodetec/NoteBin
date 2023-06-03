import { SimplePool } from "nostr-tools";

export const RELAYS = [
  "wss://relay.damus.io",
  "wss://nos.lol",
  // "wss://relay.snort.social",
  "wss://nostr-pub.wellorder.net",
  // "wss://nostr.nostrelay.org",
  // "wss://relay.nostr.ch",
  // "wss://nostr.bitcoiner.social",
  // "wss://nostr.onsats.org",
  // "wss://nostr-relay.wlvs.space",
  // "wss://nostr.zebedee.cloud",
  // "wss://relay.nostr.info",
];

export const POOL = new SimplePool();
