import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserRegister() {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser({ ...data, role: "user" });
      alert("Registrado! Inicia sesión");
      nav("/login");
    } catch (e) {
      alert("Error registro");
    }
  };

  return (
    <div className="mobile-container">
      <h2>Registro - Usuario</h2>
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
