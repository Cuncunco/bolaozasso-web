import { api } from "./axios";
import { setAuthToken } from "./auth";

type AuthResponse = {
  user: { id: string; name?: string | null; email: string; avatarUrl?: string | null };
  token: string;
};

export async function registerUser(params: { name?: string; email: string; password: string }) {
  const { data } = await api.post<AuthResponse>("/register", params);
  setAuthToken(data.token);
  return data;
}

export async function loginUser(params: { email: string; password: string }) {
  const { data } = await api.post<AuthResponse>("/login", params);
  setAuthToken(data.token);
  return data;
}
