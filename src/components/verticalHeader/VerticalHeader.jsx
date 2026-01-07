import { Outlet, Link } from "react-router-dom";
import Footer from "../footer/Footer";

export default function VerticalHeader() {
  return (
   <div className="flex flex-row min-h-dvh w-full">
  <aside className="sticky top-0 h-screen w-64 bg-primary/20">
    <nav className="flex items-center h-full justify-center"> 
      <Link
        to="/dashboard"
        className="text-primary font-semibold hover:text-primary/70 transition-colors">
        Panel de Control
      </Link>
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
