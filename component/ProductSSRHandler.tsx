// import {
//   QueryClient,
//   dehydrate,
//   HydrationBoundary,
// } from '@tanstack/react-query';

// import { getProducts, getQuotes } from '../services/product.service';
// import ProductList from '@/component/ProductList';

// export default async function ProductSSRHandler() {
//   // Create a QueryClient and prefetch (fetch) the data on the server
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['products'],
//     queryFn: getProducts,
//   });

//   await queryClient.prefetchQuery({
//     queryKey: ['quotes'],
//     queryFn: getQuotes,
//   });

//   // Dehydrate the query cache for hydration on the client
//   const dehydratedState = dehydrate(queryClient);

//   // Wrap the client component with HydrationBoundary, passing the pre-fetched state
//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <ProductList />
//     </HydrationBoundary>
//   );
// }

// src/app/products/SSRHandler.tsx

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getProducts, getQuotes } from '@/services/product.service';
import ProductList from './ProductList';

export default async function ProductSSRHandler() {
  const queryClient = new QueryClient();

  // Prefetch both in parallel
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['products'], queryFn: getProducts }),
    queryClient.prefetchQuery({ queryKey: ['quotes'], queryFn: getQuotes }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductList />
    </HydrationBoundary>
  );
}
