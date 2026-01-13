import { Outlet, Link } from "react-router-dom";
import Footer from "../footer/Footer";
import logo from "@/assets/img/logo-nobg.png";

import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import UserMenu from "../userMenu/userMenu";
import SearchCustomer from "../searchCustomer/SearchCustomer";
import SearchBar from "../searchBar/SearchBar";
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
              <SearchBar term={term} setTerm={setTerm} />
            </div>
            <UserMenu />
          </div>
        </nav>
      </header>

      <main className="overflow-y-auto  p-4 md:p-8 flex flex-col">
        <div className="mx-auto max-w-8xl w-full flex-1 flex flex-col">
          {(debouncedTerm || "").length > 0 && (
            <div className="content w-full h-full">
              <SearchCustomer debouncedTerm={debouncedTerm}/>
            </div>
          )}

          <div
            className={`content w-full h-full ${
              (debouncedTerm || "").length > 0 ? "hidden" : "block"
            }`}
          >
            <Outlet/>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
