import { createContext, useContext } from "react"

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const user = null;

  return <AuthContext.Provider value={{
    user
  }}>
    {children}
  </AuthContext.Provider>
}