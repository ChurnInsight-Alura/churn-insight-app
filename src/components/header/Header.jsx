import { Outlet, Link } from "react-router-dom";
import Footer from "../footer/Footer";
import logo from "@/assets/img/logo-nobg.png";
export default function Header() {
  return (
    <div className="grid h-dvh w-full grid-rows-[auto_1fr_auto]">
      <aside className="h-20 w-screen bg-primary sticky top-0">
        <nav className="flex h-full items-center justify-between text-white">
          <Link to="/dashboard" className="px-5 font-semibold">
            <img src={logo} alt="Logo" className="h-16 sm:h-20 px-3 w-auto" />
          </Link>

          <Link to="/user" className="px-10 font-semibold">
            User
          </Link>
        </nav>
      </aside>

      <main className="overflow-y-auto p-5">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
