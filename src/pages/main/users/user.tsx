import type React from "react";
import Layout from "../../../components/Layout/Layout";
import { useAuth } from "../../../context/AuthProvider";

const User: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="brain-icon"></div>
      <h1 className="">Bienvenido a la Página de User {user?.email}</h1>
    </Layout>
  );
};

export default User;
