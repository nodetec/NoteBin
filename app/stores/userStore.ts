import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface PublicKeyState {
  publicKey: string;
  setPublicKey: (value: string) => void;
}

export const usePublicKeyStore = create<PublicKeyState>()(
  devtools(
    persist(
      (set) => ({
        publicKey: "",
        setPublicKey: (value: string) => set({ publicKey: value }),
      }),
      {
        name: "notebin-login-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

