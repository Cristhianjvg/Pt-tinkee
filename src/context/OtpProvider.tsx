import { createContext, useContext, useState } from "react";

interface OtpContextType {
  isOtpVerified: boolean;
  verifyOtp: () => void;
}

const OtpContext = createContext<OtpContextType | undefined>(undefined);

export const OtpProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

  const verifyOtp = () => {
    setIsOtpVerified(true); // Llamar a esta función cuando el OTP sea correcto
  };

  return (
    <OtpContext.Provider value={{ isOtpVerified, verifyOtp }}>
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => {
  const context = useContext(OtpContext);
  if (!context) {
    throw new Error("useOtp debe usarse dentro de un OtpProvider");
  }
  return context;
};
