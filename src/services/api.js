import axios from "axios";

export const api = axios.create({
  baseURL: "https://parcial-backend-jet.vercel.app",
  headers: { "Content-Type": "application/json" },
});
