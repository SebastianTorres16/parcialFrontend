import { api } from "./api";

export const getProductsApi = () => api.get("/products").then((r) => r.data);
export const updateProductApi = (id, body) =>
  api.put(`/products/${id}`, body).then((r) => r.data);
export const createProductApi = (body) =>
  api.post("/products", body).then((r) => r.data);
export const deleteProductApi = (id) =>
  api.delete(`/products/${id}`).then((r) => r.data);
