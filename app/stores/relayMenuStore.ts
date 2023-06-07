import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { RelayMenuActiveTab } from "../types";

interface RelayMenuState {
  RelayMenuTabs: RelayMenuActiveTab[];
  relayMenuActiveTab: RelayMenuActiveTab;
  relayMenuIsOpen: boolean;
  setRelayMenuActiveTab: (value: RelayMenuActiveTab) => void;
  setRelayMenuIsOpen: (value: boolean) => void;
}

export const useRelayMenuStore = create<RelayMenuState>()(
  devtools((set) => ({
    RelayMenuTabs: ["Read From", "Post To", "Settings", "Discover"],
    relayMenuActiveTab: "Read From",
    relayMenuIsOpen: false,
    setRelayMenuActiveTab: (value: RelayMenuActiveTab) => set({ relayMenuActiveTab: value }),
    setRelayMenuIsOpen: (value: boolean) => set({ relayMenuIsOpen: value }),
  }))
);
