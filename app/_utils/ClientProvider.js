// ClientProvider.js
"use client";

import { AuthContextProvider } from "./auth-context";

export default function ClientProvider({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}