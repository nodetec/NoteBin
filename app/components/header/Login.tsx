"use client";

import { useEffect, useState } from "react";

import { useLightningStore } from "@/app/stores/lightningStore";
import { useUserProfileStore } from "@/app/stores/userProfileStore";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

import UserProfile from "../profile/UserProfile";

export default function Login({ children }: any) {
  const { userPublicKey, setUserPublicKey } = useUserProfileStore();
  const { setLightningEnabled } = useLightningStore();
  // https://github.com/vercel/next.js/discussions/17443
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loginHandler = async () => {
    if (typeof nostr !== "undefined") {
      const publicKey: string = await nostr.getPublicKey();
      setUserPublicKey(publicKey);
    }

    if (typeof webln !== "undefined") {
      await webln.enable();
      setLightningEnabled(true);
    }
  };

  return mounted && <div>{userPublicKey === "" ? <button onClick={loginHandler}>{children}</button> : <UserProfile />}</div>;
  // : (
  // <UserCircleIcon className="h-7 w-7 text-smoke-400" aria-hidden="true" />
  // );
}
