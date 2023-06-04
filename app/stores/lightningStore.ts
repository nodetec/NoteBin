import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LightningState {
  enabled: boolean;
  setLightningEnabled: (value: boolean) => void;
}

export const useLightningStore = create<LightningState>()(
  devtools((set) => ({
    enabled: false,
    setLightningEnabled: (value: boolean) => set({ enabled: value }),
  }))
);
