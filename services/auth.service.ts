// src/services/auth.service.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  [key: string]: any;
}

async function loginFn({ username, password }: Credentials) {
  const { data } = await axios.post<LoginResponse>("/api/login", {
    username,
    password,
  });
  return data;
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: loginFn,
  });
}
