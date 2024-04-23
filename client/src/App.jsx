import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import { lazy, useEffect, useState } from "react";
import { server } from "../helpers/server";

const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Login/Login"));
const Signup = lazy(() => import("./Signup/Signup"));
const Profile = lazy(() => import("./Profile/Profile"));

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const [ checkCookie, setCheckCookie ] = useState(false);

  useEffect(() => {
    server.get("fetchuser").then(res => {
      const { data } = res;

      if (data) loginUser({ data });
      setCheckCookie(true);
    }).catch(console.log);

    return () => setCheckCookie(false);
  }, []);

  useEffect(() => {
    if (user === null && checkCookie) return navigate("/login");
  }, [user, navigate]);
  
  return children;
}

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
    </Routes>
  </BrowserRouter>
}