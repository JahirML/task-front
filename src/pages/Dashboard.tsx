import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis proyetos</h1>
      <p className="mt-5 text-2xl font-light text-gray-500">
        Maneja y administra tus proyectos
      </p>
      <nav className="my-5">
        <Link
          to="/projects/create"
          className="cursor-pointer bg-purple-400 px-8 py-3 text-xl text-white transition-all hover:bg-purple-500"
        >
          Nuevo proyecto
        </Link>
      </nav>
    </>
  );
}

export default Dashboard;
