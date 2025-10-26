import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserLogin() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      const usuario = await login(data);
      if (usuario?.role === "admin") nav("/admin/dashboard");
      else nav("/user/home");
    } catch (e) {
      alert("Error login");
    }
  };

  return (
    <div className="mobile-container">
      <h2>Iniciar sesión</h2>
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
