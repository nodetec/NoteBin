import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { Profile } from "../types";

interface ProfileState {
  profiles: Record<string, Profile>;
  setProfile: (profile: Profile) => void;
  getProfile: (relay: string, publicKey: string) => Profile | undefined;
}

export const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set, get) => ({
        profiles: {},
        setProfile: (profile: Profile) => {
          const newProfile = { [`${profile.relay}_${profile.publicKey}`]: profile };
          set((state) => ({ profiles: { ...state.profiles, ...newProfile } }));
        },
        getProfile: (relay: string, publicKey: string) => get().profiles[`${relay}_${publicKey}`],
      }),
      {
        name: "notebin-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
