import { api } from "./api";

export const createSaleApi = (payload) =>
  api.post("/sales", payload).then((r) => r.data);
export const getSalesApi = () => api.get("/sales").then((r) => r.data);
