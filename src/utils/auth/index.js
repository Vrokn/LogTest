import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const userData = JSON.parse(Cookies.get("user") || null);

function validateAdmin(user) {
  if (!user) {
    return null;
  }

  const newUser = { ...user };

  if (newUser && newUser.role === "Admin") {
    newUser.admin = true;
  }

  return newUser;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(validateAdmin(userData));

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (user) => setUser(validateAdmin(user)),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
