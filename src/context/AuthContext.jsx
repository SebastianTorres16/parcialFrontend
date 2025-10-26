import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../services/auth.api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (data) => {
    const res = await loginApi(data);
    // backend devuelve { mensaje, usuario: { id, nombre/username, email?, rol } }
    const usuario = res.usuario || res.user || res; // adaptativo
    setUser(usuario);
    return usuario;
  };

  const register = async (data) => {
    return await registerApi(data);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
