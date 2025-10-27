import axios from "axios";

export const api = axios.create({
  baseURL: "https://parcial-backend-livid.vercel.app/",
  headers: { "Content-Type": "application/json" },
});
