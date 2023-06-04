"use client";

import { useEffect, useState } from "react";

import { useLightningStore } from "@/app/stores/lightningStore";
import { usePublicKeyStore } from "@/app/stores/userStore";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

export default function Login({ children }: any) {
  const { publicKey, setPublicKey } = usePublicKeyStore();
  const { setLightningEnabled } = useLightningStore();
  // https://github.com/vercel/next.js/discussions/17443
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loginHandler = async () => {
    if (typeof nostr !== "undefined") {
      const publicKey: string = await nostr.getPublicKey();
      setPublicKey(publicKey);
    }

    if (typeof webln !== "undefined") {
      await webln.enable();
      setLightningEnabled(true);
    }
  };

  return mounted ? (
    <div>
      {publicKey === "" ? (
        <button onClick={loginHandler}>{children}</button>
      ) : (
        <UserCircleIcon className="h-7 w-7 text-smoke-400" aria-hidden="true" />
      )}
    </div>
  ) : (
    <UserCircleIcon className="h-7 w-7 text-smoke-400" aria-hidden="true" />
  );
}
