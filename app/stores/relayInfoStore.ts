import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type Limitation = {
  max_message_length: number;
  max_subscriptions: number;
  max_filters: number;
  max_limit: number;
  max_subid_length: number;
  min_prefix: number;
  max_event_tags: number;
  max_content_length: number;
  min_pow_difficulty: number;
  auth_required: boolean;
  payment_required: boolean;
};

type Fee = {
  amount: number;
  unit: string;
};

interface InfoState {
  name: string;
  description: string;
  pubkey: string;
  contact: string;
  supported_nips: number[];
  supported_nip_extensions: string[];
  software: string;
  version: string;
  limitation: Limitation;
  payments_url: string;
  fees: { admission: Fee[]; publication: Fee[] };
}

interface RelayStore {
  relays: Record<string, InfoState>;
  addRelay: (relayUrl: string, info: InfoState) => void;
  getRelay: (relayUrl: string) => InfoState;
  removeRelay: (relayUrl: string) => void;
}

export const useRelayInfoStore = create<RelayStore>()(
  devtools(
    persist(
      (set, get) => ({
        relays: {},
        addRelay: (relayUrl, info) => set((state) => ({ relays: { ...state.relays, [relayUrl]: info } })),
        getRelay: (relayUrl) => get().relays[relayUrl],
        // getRelay: (relayUrl) => state => state.relays[relayUrl],
        removeRelay: (relayUrl) =>
          set((state) => {
            const { [relayUrl]: removedRelay, ...remainingRelays } = state.relays;
            return { relays: remainingRelays };
          }),
      }),
      {
        name: "notebin-relayinfo-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
