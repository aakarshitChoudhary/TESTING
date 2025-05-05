"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => console.error("[Products ErrorBoundary]", error), [error]);
  return (
    <div style={{ padding: 16, border: "1px solid red" }}>
      <h2>Something went wrong loading products.</h2>
      <button
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "lightblue",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          margin: "0px 8px",
        }}
        onClick={reset}
      >
        Retry
      </button>
      <Link href="/">
        <button
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "0px 8px",
          }}
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}
