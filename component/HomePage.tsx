import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to our Store</h1>
      <Link href="/products">
        <button
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Protected Route Products
        </button>
      </Link>
      <Link href="/login">
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
          Login
        </button>
      </Link>
    </main>
  );
}
