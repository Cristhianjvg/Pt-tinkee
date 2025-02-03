import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./otp.css";
import { useOtp } from "../../../context/OtpProvider";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const { verifyOtp } = useOtp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!generatedOtp) {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      console.log("OTP generado:", newOtp);
    }
  }, [generatedOtp]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // Solo permitir números

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-box-${index + 1}`)?.focus();
    }
  };

  const validateOtp = () => {
    const otpString = otp.join("");
    if (otpString === generatedOtp) {
      verifyOtp(); // Actualiza el estado del contexto para permitir el acceso
      navigate("/"); // Redirigir a la página de inicio
    } else {
      setError("OTP incorrecto. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="main-otp">
      <div className="card">
        <div className="icon-circle">
          <svg
            className="lock-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1>OTP Validation</h1>
        <p>Enter the 6-digit code sent to your device.</p>

        <div className="otp-grid">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-box-${index}`}
              type="text"
              className="otp-box"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              required
            />
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button id="submit-btn" className="submit-btn" onClick={validateOtp}>
          Validate OTP
        </button>
      </div>
    </div>
  );
};

export default Otp;
