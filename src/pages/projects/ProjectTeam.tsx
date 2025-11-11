import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, useParams, useSearchParams } from "react-router-dom";

function ProjectTeam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const projectId = params.projectId!;

  return (
    <>
      <h1 className="text-5xl font-black">Administrar equipo</h1>
      <p className="mt-5 text-2xl font-light text-gray-500">
        Administra el equipo de trabajo para este proyecto
      </p>
      <nav className="my-5 flex gap-3">
        <button
          onClick={() => setSearchParams({ addMember: "true" })}
          className="cursor-pointer bg-purple-400 px-10 py-3 text-xl font-bold text-white transition-all hover:bg-purple-500"
        >
          Agregar colaborador
        </button>
        <Link
          to={`/projects/${projectId}`}
          className="cursor-pointer bg-fuchsia-500 px-10 py-3 text-xl font-bold text-white transition-all hover:bg-fuchsia-700"
        >
          Volver a proyecto
        </Link>
      </nav>
    </>
  );
}

export default ProjectTeam;
