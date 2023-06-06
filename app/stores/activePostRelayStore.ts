import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";


interface RelayState {
  activePostRelays: string[];
  addActivePostRelay: (relay: string) => void;
  removeActivePostRelay: (relay: string) => void;
}

export const useActivePostRelayStore = create<RelayState>()(
  devtools(
    persist(
      (set) => ({
        activePostRelays: [],
        addActivePostRelay: (relay) => set((state) => ({ activePostRelays: [...state.activePostRelays, relay] })),
        removeActivePostRelay: (relay) => set((state) => ({ activePostRelays: state.activePostRelays.filter((r) => r !== relay) })),
      }),
      {
        name: "relay-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

