import { createContext, useState, FC, ReactNode } from "react";

// Define the user object shape with userType
interface User {
  email: string;
  userType: "Moderation" | "Analysis" | "User"; // Define possible UserType values
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, userType: "Moderation" | "Analysis" | "User") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Modify login to accept userType along with email
  const login = (
    email: string,
    userType: "Moderation" | "Analysis" | "User"
  ) => {
    setUser({ email, userType });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
