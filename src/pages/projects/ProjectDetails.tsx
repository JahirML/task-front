import TaskForm from "@/components/tasks/TaskForm";
import useGetProjectById from "@/hooks/projects/useGetProjectById";
import Modal from "@/ui/Modal";
import Spinner from "@/ui/Spinner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { TaskFormData } from "@/types/index";
import useCreateTask from "@/hooks/tasks/useCreateTask";
import { toast } from "react-toastify";
import TaskList from "@/components/tasks/TaskList";
import { useQueryClient } from "@tanstack/react-query";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import useAuth from "@/hooks/auth/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

function ProjectDetails() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLoading: isLoadingUser } = useAuth();

  const { createTask } = useCreateTask();
  const { project, isLoading, projectId } = useGetProjectById();

  const initialValues: TaskFormData = {
    name: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  function onSubmit(formData: TaskFormData) {
    createTask(
      { projectId, formData },
      {
        onSuccess: (data) => {
          toast.success(data);
          reset();
          onClose();
          queryClient.invalidateQueries({
            queryKey: ["editProject", `project/${projectId}`],
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }
  const canEdit = useMemo(
    () => project?.manager === user?._id,
    [project, user],
  );

  const isOpenModal = Boolean(searchParams.get("newTask"));
  const ViewTaskModal = Boolean(searchParams.get("viewTask"));
  const editTaskModal = Boolean(searchParams.get("editTask"));
  function onClose() {
    navigate("", { replace: true });
  }

  if (isLoading && isLoadingUser) return <Spinner />;
  if (project && user)
    return (
      <>
        <h1 className="text-3xl font-black md:text-5xl">
          {project.projectName}
        </h1>
        <p className="mt-5 text-xl font-light text-gray-500 md:text-2xl">
          {project.description}
        </p>
        {isManager(project.manager, user._id) && (
          <nav className="my-5 flex flex-col gap-3 text-center md:flex-row">
            <button
              onClick={() => setSearchParams({ newTask: "true" })}
              className="cursor-pointer bg-purple-400 px-10 py-3 text-xl font-bold text-white transition-all hover:bg-purple-500"
            >
              Agregar tarea
            </button>
            <Link
              to="team"
              className="cursor-pointer bg-fuchsia-500 px-10 py-3 text-xl font-bold text-white transition-all hover:bg-fuchsia-700"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={project.tasks} canEdit={canEdit} />
        {isOpenModal && (
          <Modal>
            <div>
              <h3 className="mb-4 text-3xl font-black">Nueva Tarea</h3>
              <p className="text-xl font-bold">
                Llena el formulario y crea {""}
                <span className="text-fuchsia-600">una tarea</span>
              </p>

              <form
                noValidate
                className="mt-10 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TaskForm register={register} errors={errors} />
                <input
                  type="submit"
                  value="Guardar tarea"
                  className="w-full cursor-pointer bg-fuchsia-600 p-3 font-bold text-white uppercase transition-all hover:bg-fuchsia-700"
                />
              </form>
            </div>
          </Modal>
        )}
        {editTaskModal && <EditTaskData projectId={projectId} />}
        {ViewTaskModal && <TaskModalDetails />}
      </>
    );
}

export default ProjectDetails;
