import type React from "react";
import "./Header.css";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../../context/AuthProvider";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <header className="header">
      <div className="user-info">
        <span className="user-name">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="logout-button"
          aria-label="Cerrar sesión"
        >
          <CiLogout size={30} />
        </button>
      </div>
    </header>
  );
};

export default Header;
