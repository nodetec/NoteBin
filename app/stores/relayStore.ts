import { create } from "zustand";
import { RELAYS } from "@/app/lib/constants";
import { relayInit } from "nostr-tools";
import type { Relay, Event } from "nostr-tools";

export interface RelaysState {
  allRelays: string[];
  setAllRelays: (allRelays: string[]) => void;
  activeRelay?: Relay;
  setActiveRelay: (relay: Relay) => void;
  relayUrl: string;
  setRelayUrl: (relayUrl: string) => void;
  connect: (newRelayUrl: string) => Promise<any>;
  connectedRelays: Set<Relay>;
  setConnectedRelays: (relays: Set<Relay>) => void;
  publish: (
    relays: string[],
    event: Event,
    onOk: () => void,
    onSeen: () => void,
    onFailed: () => void
  ) => void;
  subscribe: (
    relays: string[],
    filter: any,
    onEvent: (event: Event) => void,
    onEOSE: () => void
  ) => void;
}

export const useRelayStore = create<RelaysState>((set) => ({
  allRelays: RELAYS,

  setAllRelays: (newRelays: string[]) => {
    return set({ allRelays: newRelays });
  },

  activeRelay: undefined,

  setActiveRelay: (newRelay: Relay) => {
    return set({ activeRelay: newRelay });
  },

  relayUrl: RELAYS[0],

  setRelayUrl: (relayUrl: string) => {
    return set({ relayUrl });
  },

  connect: async (newRelayUrl: string) => {
    // console.log("connecting to relay:", newRelayUrl);
    if (!newRelayUrl) return;

    let relay: Relay;
    let existingRelay: Relay | undefined;
    const connectedRelays = useRelayStore.getState().connectedRelays;
    if (connectedRelays.size > 0) {
      existingRelay = Array.from(connectedRelays).find(
        (r) => r.url === newRelayUrl
      );
    }

    if (existingRelay) {
      console.log("info", `✅ nostr (${newRelayUrl}): Already connected!`);
      relay = existingRelay;
      useRelayStore.setState({ activeRelay: relay });
    } else {
      console.log("NEWING UP A RELAY");
      relay = relayInit(newRelayUrl);

      await relay.connect();

      relay.on("connect", () => {
        console.log("info", `✅ nostr (${newRelayUrl}): Connected!`);
        const relayUrl = useRelayStore.getState().relayUrl;
        if (relayUrl === relay.url) {
          useRelayStore.setState({ activeRelay: relay });
          const connectedRelays = useRelayStore.getState().connectedRelays;
          const isRelayInSet = Array.from(connectedRelays).some(
            (r) => r.url === relay.url
          );

          if (!isRelayInSet) {
            set((state) => ({
              ...state,
              connectedRelays: new Set([...connectedRelays, relay]),
            }));
          }
        }
      });

      relay.on("disconnect", () => {
        console.log("warn", `🚪 nostr (${newRelayUrl}): Connection closed.`);
        set({
          connectedRelays: new Set(
            [...connectedRelays].filter((r) => r.url !== relay.url)
          ),
        });
      });

      relay.on("error", () => {
        console.log("error", `❌ nostr (${newRelayUrl}): Connection error!`);
      });
    }

    return relay;
  },

  connectedRelays: new Set<Relay>(),

  setConnectedRelays: (relays) => set({ connectedRelays: relays }),

  publish: async (
    relays: string[],
    event: any,
    onOk: () => void,
    // onSeen: () => void,
    onFailed: () => void
  ) => {
    console.log("publishing to relays:", relays);
    for (const url of relays) {
      const relay = await useRelayStore.getState().connect(url);

      if (!relay) return;

      let pub = relay.publish(event);

      pub.on("ok", () => {
        console.log(`${url} has accepted our event`);
        onOk();
      });

      // pub.on("seen", () => {
      //   console.log(`we saw the event on ${url}`);
      //   onSeen();
      //   // relay.close();
      // });

      pub.on("failed", (reason: any) => {
        console.log(`failed to publish to ${url}: ${reason}`);
        onFailed();
        // relay.close();
      });
    }
  },

  subscribe: async (
    relays: string[],
    filter: any,
    onEvent: (event: any) => void,
    onEOSE: () => void
  ) => {
    for (const url of relays) {
      const relay = await useRelayStore.getState().connect(url);

      if (!relay) return;

      let sub = relay.sub([filter]);

      sub.on("event", (event: any) => {
        // console.log("we got the event we wanted:", event);
        onEvent(event);
      });

      sub.on("eose", () => {
        // console.log("we've reached the end:");
        sub.unsub();
        onEOSE();
      });
    }
  },
}));
