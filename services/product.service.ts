import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// 1️⃣ Service functions
export async function getProducts(): Promise<{ products: any[] }> {
  const res = await axios.get('/api/products');
  return res.data;
}

export async function getQuotes(): Promise<{ quotes: any[] }> {
  const res = await axios.get('/api/quotes');
  return res.data;
}

// 2️⃣ React Query hooks
export function useProducts(): UseQueryResult<{ products: any[] }, Error> {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
}

export function useQuotes(): UseQueryResult<{ quotes: any[] }, Error> {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: getQuotes,
  });
}
