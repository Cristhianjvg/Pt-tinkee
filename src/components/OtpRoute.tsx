import { Navigate, Outlet } from "react-router-dom";
import { useOtp } from "../context/OtpProvider";

const OtpRoute: React.FC = () => {
  const { isOtpVerified } = useOtp();

  return isOtpVerified ? <Outlet /> : <Navigate to="/otp" />;
};

export default OtpRoute;
