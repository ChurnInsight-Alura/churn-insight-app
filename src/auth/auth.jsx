import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const AUTH_KEY = "churn-insight:auth";

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredAuth(value) {
  try {
    if (!value) localStorage.removeItem(AUTH_KEY);
    else localStorage.setItem(AUTH_KEY, JSON.stringify(value));
  } catch {}
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredAuth()?.user ?? null);

  useEffect(() => {
    writeStoredAuth(user ? { user } : null);
  }, [user]);

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: !!user,
      login: async ({ username, password }) => {
        const u = (username || "").trim();
             const p = (password || "").trim();

                
                const USERS = {
                admin: { password: "admin", role: "admin" },
                user: { password: "user", role: "user" },
                };

                const record = USERS[u];
                  if (!record || record.password !== p) {
                  return { ok: false, message: "Credenciales inválidas." };
                }

            setUser({ name: u, role: record.role });
                return { ok: true };
     },

      logout: () => setUser(null),
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}


export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
}

export function RequireAdmin({ children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
}