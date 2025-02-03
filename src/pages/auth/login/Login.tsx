import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Asegúrate de crear este archivo CSS
import loginImg from "../../../assets/login.png";
import welcomeImg from "../../../assets/welcome.webp";
import googleImg from "../../../assets/googlepng.png";
// import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "El correo no tiene un formato válido";
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Iniciar sesión
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/otp");
      alert("Usuario logueado");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      await login();
    }
  };

  // Carrusel

  const [currentImage, setCurrentImage] = useState(0);
  const images = [loginImg, welcomeImg];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 10000); // Cambia la imagen cada 10 segundos

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="main-login">
      <div className="container">
        <div className="left-container">
          <div className="carousel">
            {images.map((img, index) => (
              <img
                key={index}
                src={img || "/placeholder.svg"}
                alt={`Login image ${index + 1}`}
                className={`loginImage ${
                  index === currentImage ? "active" : ""
                }`}
              />
            ))}
          </div>
        </div>
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

            <div className="login-form">
              <form onSubmit={handleSubmit}>
                {/* Campo de usuario */}
                <div className="form-group">
                  <MdOutlineMail className="input-icon" />
                  <input
                    type="email"
                    id="user"
                    name="user"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.user && <span className="error">{errors.user}</span>}
                </div>

                {/* Campo de contraseña */}
                <div className="form-group">
                  {/* <RiLockPasswordFill className="input-icon" /> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                {/* Opciones de recordar contraseña y olvidar contraseña */}
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" id="remember" name="remember" />
                    Remember password
                  </label>
                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                </div>

                {/* Botón de iniciar sesión */}
                <button type="submit" className="login-button">
                  Iniciar Sesión
                </button>

                {/* Botón de Google */}
                <button type="button" className="google-button">
                  <img
                    src={googleImg}
                    alt="Google Logo"
                    className="google-logo"
                  />
                  Sign in with Google
                </button>
              </form>
            </div>

            <div className="sign-up">
              {" "}
              No tienes una cuenta?{" "}
              <a onClick={() => navigate("/register")}>Registrate</a>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
