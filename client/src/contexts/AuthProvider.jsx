import { createContext, useContext, useState } from "react"

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
  }

  return <AuthContext.Provider value={{
    user, loginUser, signOutUser
  }}>
    {children}
  </AuthContext.Provider>
}