import { createContext, useContext, useEffect, useState } from "react"
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
    server.get("signout", { withCredentials: true })
      .then(console.log)
      .catch(console.log);
  }

  return <AuthContext.Provider value={{
    user, loginUser, signOutUser
  }}>
    {children}
  </AuthContext.Provider>
}