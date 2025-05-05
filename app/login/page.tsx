'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    console.log('res: ', res);

    if (res.ok) {
      router.push('/products');
    } else {
      setError('Login failed');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: 'auto', marginTop: '40px' }}
    >
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        style={{
          width: '100%',
          marginBottom: 8,
          color: 'black',
          padding: '2px',
          outline: 'none',
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        style={{
          width: '100%',
          marginBottom: 8,
          color: 'black',
          padding: '2px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{ width: '100%', border: '2px solid red', padding: '2px' }}
      >
        Login
      </button>
    </form>
  );
}
