import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import UserRegister from "./pages/MovilPages/UserRegister";
import UserLogin from "./pages/MovilPages/UserLogin";
import UserHome from "./pages/MovilPages/UserHome";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";

function Protected({ children, role }) {
  const { user } = useAuth();
  if (!user)
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* User */}
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/user/home"
          element={
            <Protected role="user">
              <UserHome />
            </Protected>
          }
        />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <Protected role="admin">
              <AdminDashboard />
            </Protected>
          }
        />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
