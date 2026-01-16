import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import logo from "@/assets/img/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const from = useMemo(() => {
    return location.state?.from?.pathname || "/dashboard";
  }, [location.state]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, from, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login({ username, password });
      if (!res?.ok) {
        setError(res?.message || "No se pudo iniciar sesión");
        return;
      }
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh w-full bg-[#eaf3fb]">
      
      <div className="h-2 w-full bg-gradient-to-r from-[#001a37] via-[#315c99] to-[#40cee6]" />

      <div className="min-h-[calc(100dvh-0.5rem)] w-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white shadow-[0_12px_30px_rgba(0,26,55,0.18)] overflow-hidden">
          
          <div className="px-6 pt-6">
            <div className="flex items-center gap-3 justify-between px-8">
              <div>
                <h1 className="text-2xl font-extrabold text-[#001a37] leading-tight">
                  Login
                </h1>
              </div>
              <img src={logo} alt="CusTech" className="h-20 w-auto" />
            </div>

          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5 space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#001a37]">Usuario</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#40cee6]/40 focus:border-[#40cee6]"
                placeholder="Ej: admin o user"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#001a37]">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#40cee6]/40 focus:border-[#40cee6]"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#001a37] px-4 py-2.5 text-white font-semibold hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Ingresar"}
            </button>

        
          </form>
        </div>
      </div>
    </div>
  );
}
