import axios from "axios";

export const api = axios.create({
  baseURL: "https://parcial-backend-jet.vercel.app/backend",
  headers: { "Content-Type": "application/json" },
});
