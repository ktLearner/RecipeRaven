import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../../helpers/server";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function loginUser(cred) {
    setUser(cred);
  }

  function signOutUser() {
    setUser(null);
    server
      .get("signout", { withCredentials: true })
      .then(console.log)
      .catch(console.log);
  }

  function isFav(rid) {
    return user?.data.favourites.includes(rid);
  }

  function removeFav(rid) {
    server.delete("/recipe/favourites?id=" + rid).then(() => {
      setUser((prev) => {
        const idx = prev.data.favourites.findIndex((r) => r === rid);
        prev?.data.favourites.splice(idx, 1);
        return { ...prev };
      });
    });
  }

  function addFav(rid) {
    server.put("/recipe/favourites?id=" + rid).then(() => {
      setUser((prev) => {
        prev?.data.favourites.push(rid);
        return { ...prev };
      });
    });
  }

  function toggleFav(rid) {
    if (isFav(rid)) removeFav(rid);
    else addFav(rid);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        signOutUser,
        isFav,
        addFav,
        removeFav,
        toggleFav,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
