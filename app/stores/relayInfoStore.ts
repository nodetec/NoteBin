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
  url: string;
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
  relayInfoRecord: Record<string, InfoState>;
  addRelayInfo: (relayUrl: string, info: Omit<InfoState, "url">) => void;
  getRelayInfo: (relayUrl: string) => InfoState;
  getAllRelayInfo: () => InfoState[];
  removeRelayInfo: (relayUrl: string) => void;
}

export const useRelayInfoStore = create<RelayStore>()(
  devtools(
    persist(
      (set, get) => ({
        relayInfoRecord: {},
        // addRelayInfo: (relayUrl, info) => set((state) => ({ relayInfoRecord: { ...state.relayInfoRecord, [relayUrl]: info } })),
        addRelayInfo: (relayUrl, info) =>
          set((state) => ({
            relayInfoRecord: {
              ...state.relayInfoRecord,
              [relayUrl]: { ...info, url: relayUrl },
            },
          })),
        getRelayInfo: (relayUrl) => get().relayInfoRecord[relayUrl],
        getAllRelayInfo: () => {
          const state = get();
          return Object.values(state.relayInfoRecord);
        },
        removeRelayInfo: (relayUrl) =>
          set((state) => {
            const { [relayUrl]: removedRelay, ...remainingRelays } = state.relayInfoRecord;
            return { relayInfoRecord: remainingRelays };
          }),
      }),
      {
        name: "notebin-relayinfo-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
