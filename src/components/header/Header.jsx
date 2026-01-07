import { Outlet, Link } from "react-router-dom";
import Footer from "../footer/Footer";

export default function Header() {
  return (
   <div className="flex flex-row flex-wrap min-h-dvh w-full">
  <aside className="sticky top-0 h-20 w-screen bg-primary">
    <nav className="flex items-center h-full justify-between text-white"> 
      <div className="nav-container-left">
        <Link
        to="/dashboard"
        className="font-semibold px-5">
        Panel de Control
      </Link>
      </div>
      <div className="nav-container-right px-10">
         <Link
        to="/user"
        className=" font-semibold">
        User
      </Link>
      </div>
      
    </nav>
  </aside>
  <div className="flex flex-col flex-1">
    <main className="flex-1 p-5">
      <Outlet />
    </main>

    <Footer />
  </div>
</div>
  );
}
