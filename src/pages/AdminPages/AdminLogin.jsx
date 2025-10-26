import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      const usuario = await login(data);
      if (usuario?.role === "admin") nav("/admin/dashboard");
      else alert("No eres admin");
    } catch (e) {
      alert("Error login");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 16 }}>
      <h2>Admin - Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", { required: true })}
          placeholder="Usuario"
        />
        <input
          {...register("password", { required: true })}
          placeholder="Contraseña"
          type="password"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
