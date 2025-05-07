import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

// 1️⃣ Service functionscl
export async function getProducts() {
  const { data } = await axios.get<{ products: any[] }>("/api/products");
  return data;
}

export async function getQuotes() {
  const { data } = await axios.get<{ quotes: any[] }>("/api/quotes");
  return data;
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
