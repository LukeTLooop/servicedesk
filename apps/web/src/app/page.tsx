"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [
    status,
    setStatus,
  ] = useState("Checking...");
  const [
    message,
    setMessage,
  ] = useState("Checking...");

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        setStatus(data.status);
        setMessage(data.message);
      } catch {
        setStatus("API unavailable");
        setMessage("API unavailable");
      }
    }

    checkHealth();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">ServiceDesk</h1>

      <p>Backend status: {status}</p>
      <p>Backend message: {message}</p>
    </main>
  );
}
