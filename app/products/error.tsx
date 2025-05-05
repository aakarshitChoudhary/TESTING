'use client';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    // Log the error (to console, or send to external service)
    console.error('[Dashboard ErrorBoundary] ', error);
  }, [error]);

  return (
    <div style={{ padding: '1rem', border: '1px solid red' }}>
      <h2>Something went wrong in Dashboard!</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
