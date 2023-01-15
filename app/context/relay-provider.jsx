"use client";

import { createContext, useState } from "react";

export const RelayContext = createContext(null);

export default function RelayProvider({ children }) {
  let [relay, setRelay] = useState(null);

  return (
    <RelayContext.Provider value={{ relay, setRelay }}>
      {children}
    </RelayContext.Provider>
  );
}
