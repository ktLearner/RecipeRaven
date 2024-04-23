import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import { lazy, useEffect } from "react";
// import Home from "./Home/Home";
// import Login from "./Login/Login";
// import Signup from "./Signup/Signup";

const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Login/Login"));
const Signup = lazy(() => import("./Signup/Signup"));


function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) navigate("/login", {replace: true});
  }, [navigate, user]);

  return children;
}

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
}