import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AuthRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; // Evita el parpadeo mientras Firebase detecta la sesión

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
