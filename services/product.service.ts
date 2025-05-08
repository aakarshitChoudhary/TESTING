import { useQuery, UseQueryResult } from "@tanstack/react-query";
import httpServiceClient from "./http.service-1";

// 1️⃣ Service function
export async function getProducts() {
  const response = await httpServiceClient.get("/api/products");
  console.log("response: prod", response);
  return response.data;
}

export async function getQuotes() {
  const response = await httpServiceClient.get("/api/quotes");
  console.log("response: quote", response);
  return response.data;
}

// 2️⃣ Hooks with inline error handling
export function useProducts(): UseQueryResult<{ products: any[] }, Error> {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: false,
  });
}

export function useQuotes(): UseQueryResult<{ quotes: any[] }, Error> {
  return useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
    retry: false,
  });
}
