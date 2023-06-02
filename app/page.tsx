"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
  relayInit,
  validateEvent,
  verifySignature,
  getSignature,
  getEventHash,
  generatePrivateKey,
  getPublicKey,
} from "nostr-tools";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

function HomePage() {
  const [code, setText] = useState(`function add(a, b) {\n  return a + b;\n}`);

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    const relay = relayInit("wss://relay.example.com");
    relay.on("connect", () => {
      console.log(`connected to ${relay.url}`);
    });
    relay.on("error", () => {
      console.log(`failed to connect to ${relay.url}`);
    });

    await relay.connect();

    let privateKey = generatePrivateKey(); // `sk` is a hex string
    // let publicKey = getPublicKey(sk); // `pk` is a hex string
    let event = {
      kind: 1050,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: code,
      pubkey: getPublicKey(privateKey),
    };

    event.id = getEventHash(event);
    event.sig = getSignature(event, privateKey);

    let ok = validateEvent(event);
    let veryOk = verifySignature(event);
    console.log(event);
  };

  return (
    <main className="container mx-auto">
      <header className="mb-20 flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">notebin</h1>
      </header>
      <div>
        <CodeEditor
          value={code}
          language="js"
          placeholder="Please enter JS code."
          onChange={(evn) => setText(evn.target.value)}
          padding={15}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </main>
  );
}

export default HomePage;
