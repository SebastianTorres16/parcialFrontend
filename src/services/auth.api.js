import { api } from "./api";

export const registerApi = (payload) =>
  api.post("/users/register", payload).then((r) => r.data);
export const loginApi = (payload) =>
  api.post("/users/login", payload).then((r) => r.data);
