import { Outlet, Link } from "react-router-dom";
import Footer from "../footer/Footer";
import logo from "@/assets/img/logo-nobg.png";
import SearchCustomer from "../searchCustomer/SearchCustomer";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import UserMenu from "../userMenu/userMenu";
export default function Header() {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 2000);

  return (
    <div className="grid h-dvh w-full grid-rows-[auto_1fr_auto] overflow-hidden">

      <header className="sticky top-0 z-50 h-auto md:h-20 w-full bg-primary shadow-lg overflow-visible">
        <nav className="flex h-full flex-wrap items-center justify-between px-4 py-2 text-white md:flex-nowrap md:px-10">
          
          <Link to="/dashboard" className="shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto sm:h-16 md:h-20"
            />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-3 md:gap-8">
     
            <div className="w-full max-w-37.5 sm:max-w-md">
              <SearchCustomer term={term} setTerm={setTerm} />
            </div>
            <UserMenu />
            {/* <div className="flex items-center gap-2 font-semibold shrink-0">
              <span className="inline-block h-8 w-8 md:h-10 md:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-full w-full"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </span>
              <span className="hidden sm:inline italic opacity-90">User</span>
            </div> */}
          </div>
        </nav>
      </header>

      <main className="overflow-y-auto  p-4 md:p-8 flex flex-col">
        <div className="mx-auto max-w-8xl w-full flex-1 flex flex-col">
          <Outlet context={{ debouncedTerm }} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
