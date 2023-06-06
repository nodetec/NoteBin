import { SimplePool } from "nostr-tools";

export const RELAYS = [
  "wss://relay.damus.io",
  "wss://nos.lol",
  "wss://relay.snort.social",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.wine/",
  "wss://nostr.zebedee.cloud",
];

export const POOL = new SimplePool();
