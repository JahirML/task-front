import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1 className="text-center text-4xl font-black text-white">
        Pagina no encontrada
      </h1>
      <p className="mt-10 text-center text-white">
        Tal vez quieras volver a{" "}
        <Link to={"/"} className="text-fuchsia-500">
          Volver a inicio
        </Link>
      </p>
    </>
  );
}

export default NotFound;
