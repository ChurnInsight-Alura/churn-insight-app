import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";

export default function UserMenu({ setTerm, setTime }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Cerrar el menú si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNavigate() {
    setTerm("");
    setTime(0);
    setIsOpen(false);
  }

  function handleLogout() {
    setTerm("");
    setTime(0);
    setIsOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón del Usuario */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-semibold p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
      >
        <span className="inline-block h-8 w-8 md:h-10 md:w-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-full w-full" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </span>

        <span className="hidden sm:inline italic opacity-90 text-white">
          {user?.name || "User"}
        </span>
      </button>

      {/* DROPDOWN - Sobresale de la barra */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-100 border border-slate-100 animate-in fade-in zoom-in duration-100 pointer-events-auto user-menu">
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase text-left">Menú</p>
          </div>

          <Link
            className="block w-full text-left  px-4 py-2  text-slate-700 text-sm hover:bg-slate-50 transition-colors tracking-wider um-item"
            to="/"
            onClick={handleNavigate}
          >
            Home
          </Link>

          <Link
            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors tracking-wider um-item"
            to="/search"
            onClick={handleNavigate}
          >
            Buscar Cliente
          </Link>

          {user?.role === "admin" && (
          <Link
            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors tracking-wider um-item"
            to="/dashboard"
            onClick={handleNavigate}
          >
            Dashboard
          </Link>
          )}


          <Link
            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors tracking-wider um-item"
            to="/profile"
            onClick={handleNavigate}
          >
            Mi Perfil
          </Link>

          <hr className="my-1 border-slate-100" />

          <button
            onClick={handleLogout}
            className="w-full  px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors um-item"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
