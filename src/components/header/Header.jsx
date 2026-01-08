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

          <div className="flex items-center gap-5">
            <Link
              to="/user"
              className="hidden md:inline-block px-10 font-semibold md:text-xl"
            >
              ChurnInsight Prediction
            </Link>

            <div className="px-10 font-semibold flex items-center gap-2">
              <span className="w-10 h-10 inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-full h-full"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </span>
              User
            </div>
          </div>
        </nav>
      </aside>

      <main className="overflow-y-auto p-5">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
