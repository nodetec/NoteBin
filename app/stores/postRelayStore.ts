import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type Relay = {
  url: string;
  isActive: boolean;
};

interface RelayState {
  activeRelays: Relay[];
  addRelay: (relay: Relay) => void;
  removeRelay: (url: string) => void;
  updateRelayStatus: (url: string, isActive: boolean) => void;
  sortRelays: () => void;
}

export const useActivePostRelayStore = create<RelayState>()(
  devtools(
    persist(
      (set) => ({
        activeRelays: [
          { url: "wss://relay.damus.io", isActive: true },
          { url: "wss://nos.lol", isActive: false },
          { url: "wss://relay.snort.social", isActive: false },
          { url: "wss://nostr-pub.wellorder.net", isActive: false },
          { url: "wss://nostr.wine/", isActive: false },
          { url: "wss://nostr.zebedee.cloud", isActive: false },
        ],
        addRelay: (relay) => set((state) => ({ activeRelays: [...state.activeRelays, relay] })),
        removeRelay: (url) => set((state) => ({ activeRelays: state.activeRelays.filter((relay) => relay.url !== url) })),
        updateRelayStatus: (url, isActive) =>
          set((state) => {
            const updatedRelays = state.activeRelays.map((relay) => (relay.url === url ? { ...relay, isActive } : relay));
            return { activeRelays: updatedRelays };
          }),
        sortRelays: () =>
          set((state) => {
            const sortedRelays = [...state.activeRelays].sort((a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1));
            return { activeRelays: sortedRelays };
          }),
      }),
      {
        name: "relay-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
