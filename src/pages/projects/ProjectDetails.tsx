import useGetProjectById from "@/hooks/useGetProjectById";
import Modal from "@/ui/Modal";
import Spinner from "@/ui/Spinner";
import { useNavigate, useSearchParams } from "react-router-dom";

function ProjectDetails() {
  const { project, isLoading } = useGetProjectById();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpenModal = Boolean(searchParams.get("newTask"));
  function onClose() {
    navigate("", { replace: true });
  }
  if (isLoading) return <Spinner />;
  if (project)
    return (
      <>
        <h1 className="text-5xl font-black">{project.projectName}</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          {project.description}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            onClick={() => setSearchParams({ newTask: "true" })}
            className="cursor-pointer bg-purple-400 px-10 py-3 text-xl font-bold text-white transition-all hover:bg-purple-500"
          >
            Agregar tarea
          </button>
        </nav>
        {isOpenModal && (
          <Modal onClose={onClose}>
            <div>
              <h3 className="mb-4 text-3xl font-black">Nueva Tarea</h3>
              <p className="text-xl font-bold">
                Llena el formulario y crea {""}
                <span className="text-fuchsia-600">una tarea</span>
              </p>
            </div>
          </Modal>
        )}
      </>
    );
}

export default ProjectDetails;
