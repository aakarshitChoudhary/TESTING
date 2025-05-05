import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getProducts, getQuotes } from "@/services/product.service";
import ProductList from "./ProductList";

export default async function ProductSSRHandler() {
  const queryClient = new QueryClient();

  // Prefetch both in parallel
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["products"], queryFn: getProducts }),
    queryClient.prefetchQuery({ queryKey: ["quotes"], queryFn: getQuotes }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductList />
    </HydrationBoundary>
  );
}
