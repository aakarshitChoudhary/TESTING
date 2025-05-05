'use client';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Create a new QueryClient with a default staleTime (60 seconds)
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we set a staleTime to avoid refetching immediately on the client&#8203;:contentReference[oaicite:0]{index=0}.
        staleTime: 60 * 1000,
      },
    },
  });
}

// We reuse the same QueryClient in the browser, but always make a new one on the server
let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // On the server, create a fresh client each time
    return makeQueryClient();
  } else {
    // In the browser, reuse the client to avoid losing cached data between renders
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

// The Providers component wraps the app with QueryClientProvider
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
