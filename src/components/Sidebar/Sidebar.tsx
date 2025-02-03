import type React from "react";
import { Link, useLocation } from "react-router-dom";
import welcomeImg from "../../assets/welcome.webp";

import "./Sidebar.css";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { useAuth } from "../../context/AuthProvider";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Abierto por defecto en pantallas grandes
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    const isSmall = window.innerWidth <= 768;
    setIsSmallScreen(isSmall);
    // Cierra el sidebar automáticamente en pantallas pequeñas
    if (isSmall) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="logo">
          <img
            src={welcomeImg}
            alt="Descripción de la imagen"
            className="logo-image"
          />
        </div>
        {/* <button className="toggle-button" onClick={toggleSidebar}>
          <CiMenuBurger size={15} />
        </button> */}
        <nav className="nav-menu">
          <Link
            to="/"
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            <span>Inicio</span>
          </Link>
          <Link
            to="/users"
            className={`nav-item ${
              location.pathname === "/users" ? "active" : ""
            }`}
          >
            <span>Usuarios</span>
          </Link>
          <Link
            to="/transferencias"
            className={`nav-item ${
              location.pathname === "/transferencias" ? "active" : ""
            }`}
          >
            <span>transferencias</span>
          </Link>
        </nav>
      </aside>
      {isSmallScreen && (
        <button className="mobile-toggle-button" onClick={toggleSidebar}>
          <CiMenuBurger size={15} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
