import { Link, Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";

function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between lg:flex-row">
          <div className="w-64">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <NavMenu />
        </div>
      </header>
      <section className="mx-auto mt-10 max-w-screen-2xl p-5">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center">
          &copy; Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer pauseOnHover={false} closeOnClick={true} />
    </>
  );
}

export default AppLayout;
