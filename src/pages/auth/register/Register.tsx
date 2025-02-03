import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import loginImg from "../../../assets/login.png";
import welcomeImg from "../../../assets/welcome.webp";
import { MdOutlineMail } from "react-icons/md";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

// Expresión regular para validar la contraseña
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_-])[A-Za-z\d@$!%*?&#_-]{8,}$/;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password: string): boolean => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validar la contraseña antes de registrar
    if (!validatePassword(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="main-login">
      <div className="container">
        <div className="right-container">
          <div className="login-container">
            {/* <div className="title-container"> */}
            <div className="welcome-container">
              <img
                src={welcomeImg}
                alt="Descripción de la imagen"
                className="welcome-img"
              />
            </div>

            <h2 className="title">Hello Again!</h2>
            <p className="subtitle">
              hola otra vez bienvendio al sistema otra vez
            </p>
            {/* </div> */}

            <div className="register-form">
              <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500">{error}</p>}

                <div className="form-group">
                  <MdOutlineMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="login-button">
                  Registrarse
                </button>
              </form>
            </div>

            <div className="sign-up">
              {" "}
              Ya tienes una cuenta?{" "}
              <a onClick={() => navigate("/login")}>Inicia Sesion</a>{" "}
            </div>
          </div>
        </div>
        <div className="left-container">
          <img
            src={loginImg}
            alt="Descripción de la imagen"
            className="loginImage"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
