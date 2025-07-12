// src/context/AuthContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- FUNCIÓN DE LOGOUT ---

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const checkStoredSession = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);

          if (parsedUser && parsedUser.role) {
            setUser(parsedUser);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        }
      } catch (e) {
        console.error("Error al procesar la sesión guardada:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkStoredSession();
  }, []);

  // --- FUNCIÓN DE LOGIN ---
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginRequest(email, password);
      if (res.result && res.data.user) {
        const userData = res.data.user;

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", res.data.token);

        setUser(userData);
        setIsAuthenticated(true);

        navigate("/admin/homeadmin");
      }
    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        setError(err.data || "Credenciales incorrectas.");
        setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const value = { user, isAuthenticated, loading, error, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
