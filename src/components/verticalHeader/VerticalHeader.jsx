import { Outlet, Link } from "react-router-dom";
import Footer from "../footer/Footer";
import logo from "@/assets/img/logo-nobg.png"
export default function VerticalHeader() {
  return (
    <div className="grid h-dvh w-full grid-cols-[auto_1fr] grid-rows-[1fr_auto]">

      <aside className="row-span-2 w-32 sm:w-64 bg-primary/20">
        <nav className="flex flex-col p-5 items-center h-full gap-2">
          <Link to="/" className="sm:px-5 font-semibold">
                      <img src={logo} alt="Logo" className="h-16 sm:h-20 sm:px-3 w-auto" />
          </Link>
          <Link
            to="/dashboard"
            className="text-primary font-semibold hover:text-primary/70 transition-colors"
          >
            Panel de Control
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
