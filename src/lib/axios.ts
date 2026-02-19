import axios from "axios";
import { getAuthToken } from "./auth";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
