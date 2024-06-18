import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import { lazy, useEffect, useState } from "react";
import { server } from "../helpers/server";
import SearchPage from "./Search/SearchPage";

const CreateRecipe = lazy(() => import("./CreateRecipe/CreateRecipe"));
const RecipePage = lazy(() => import("./Recipe/RecipePage"));
const RecipeDetails = lazy(() => import("./Recipe/Details"));
const Error404Page = lazy(() => import("./404"));
const CookRecipe = lazy(() => import("./CookRecipe/CookRecipe"));
const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Login/Login"));
const Signup = lazy(() => import("./Signup/Signup"));
const ProfilePage = lazy(() => import("./Profile/ProfilePage"));
const FavouritesPage = lazy(() => import("./Favourites/FavouritesPage"));

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const [checkCookie, setCheckCookie] = useState(false);

  useEffect(() => {
    server
      .get("fetchuser")
      .then((res) => {
        const { data } = res;

        if (data) loginUser({ data });
        setCheckCookie(true);
      })
      .catch(console.log);

    return () => setCheckCookie(false);
  }, []);

  useEffect(() => {
    if (user === null && checkCookie) return navigate("/login");
  }, [user, checkCookie]);

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe"
          element={
            <ProtectedRoute>
              <RecipePage />
            </ProtectedRoute>
          }
        >
          <Route path="/recipe" element={<RecipeDetails />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path="cook" element={<CookRecipe />}></Route>
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <FavouritesPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Error404Page />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
