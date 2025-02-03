import type React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";
import Header from "../Header/Header";
// import { useAuth } from "../../context/AuthProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
