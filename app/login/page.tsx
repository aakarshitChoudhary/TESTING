"use client";
import { useState } from "react";
import { useLogin } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [creds, setCreds] = useState({ username: "", password: "" });
  const { mutate, isError, error, isPending } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(creds, {
      onSuccess: () => router.push("/products"),
    });
  }

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "20px" }}>
        <input
          name="username"
          autoComplete="username"
          placeholder="Username"
          value={creds.username}
          onChange={(e) => setCreds({ ...creds, username: e.target.value })}
          style={{
            width: "100%",
            marginBottom: 8,
            color: "black",
            padding: "2px",
            outline: "none",
          }}
        />
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          style={{
            width: "100%",
            marginBottom: 8,
            color: "black",
            padding: "2px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isPending}
          style={{ width: "100%", border: "2px solid red", padding: "2px" }}
        >
          {isPending ? "Logging in…" : "Login"}
        </button>
        {isError && <p style={{ color: "red" }}>{(error as Error).message}</p>}
      </form>
      <div>
        <h1>test username: emilys</h1>
        <h1>test password: emilyspass</h1>
      </div>
    </div>
  );
}
