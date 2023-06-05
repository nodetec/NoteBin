import { useEffect, useState } from "react";

import { RELAYS } from "@/app/lib/constants";
import { useRelayStore } from "@/app/stores/relayStore";
import { useUserProfileStore } from "@/app/stores/userProfileStore";
import type { Event } from "nostr-tools";

import { EventProfileContent, Profile } from "../../types";
import UserMenu from "../menus/UserMenu";

export default function UserProfile() {
  const { subscribe, activeRelay, connect, relayUrl } = useRelayStore();
  const { getUserPublicKey, getUserProfile, setUserProfile } = useUserProfileStore();
  const [currentProfile, setCurrentProfile] = useState<Profile>();

  useEffect(() => {
    console.log("activeRelay", activeRelay);
    if (activeRelay === undefined) {
      connect(RELAYS[0]);
      console.log("connected to relay");
    }
  }, []);

  const getEvents = async () => {
    if (currentProfile && currentProfile.relay === relayUrl) {
      console.log("profile exists in state");
      return;
    }

    const cachedProfile = getUserProfile(relayUrl);
    console.log("cached profile", cachedProfile);

    if (cachedProfile) {
      console.log("profile exists in cache");
      setCurrentProfile(cachedProfile);
      return;
    }

    console.log("DO I GET HERE?")

    // maybe get followers here too?
    // let kinds = [0, 3];
    let kinds = [0];

    const filter = {
      kinds,
      authors: [getUserPublicKey()],
      limit: 5,
    };

    const onEvent = (event: Event) => {
      console.log("event", event);
      const eventContent: EventProfileContent = JSON.parse(event.content);

      const profile: Profile = {
        relay: relayUrl || "",
        publicKey: getUserPublicKey() || "",
        name: eventContent.name || "", // TODO: change this to shortened pubkey if name is not set
        about: eventContent.about || "",
        picture: eventContent.picture || "",
        nip05: eventContent.nip05 || "",
        website: eventContent.website || "",
        lud06: eventContent.lud06 || "",
      };

      setUserProfile(relayUrl, profile);
      setCurrentProfile(profile);
    };

    const onEOSE = () => {
      console.log("Finished getting profile info");
    };

    subscribe([relayUrl], filter, onEvent, onEOSE);
  };

  useEffect(() => {
    getEvents();
  }, [relayUrl, activeRelay]);

  return (
    <>
      <UserMenu>{currentProfile && <img className="inline-block h-7 w-7 rounded-full" src={currentProfile.picture} alt="" />}</UserMenu>
    </>
  );
}
