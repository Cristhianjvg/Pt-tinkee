import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login/Login";
import Inicio from "./pages/main/inicio/inicio";
import Register from "./pages/auth/register/Register";
import Otp from "./pages/auth/otp/otp";
import User from "./pages/main/users/user";
import Transfer from "./pages/main/transfer/transfer";
import { AuthProvider } from "./context/AuthProvider";
import AuthRoute from "./components/AuthRoute";
import OtpRoute from "./components/OtpRoute";
import { OtpProvider } from "./context/OtpProvider";

function App() {
  // const [count, setCount] = useState(0);
  // const isAuhtenti

  return (
    <AuthProvider>
      <OtpProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<Otp />} />

            {/* Protegemos las rutas privadas con autenticación y OTP */}
            <Route element={<AuthRoute />}>
              <Route element={<OtpRoute />}>
                <Route path="/" element={<Inicio />} />
                <Route path="/users" element={<User />} />
                <Route path="/transferencias" element={<Transfer />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </OtpProvider>
    </AuthProvider>
  );
}

export default App;
