import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import useEditProject from "@/hooks/projects/useEditProject";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type EditProjectFormProps = {
  project: ProjectFormData;
};

function EditProjectForm({ project }: EditProjectFormProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const { editProject } = useEditProject();
  const { projectName, clientName, description } = project;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      projectName,
      clientName,
      description,
    },
  });

  const projectId = params.projectId!;
  const { errors } = formState;

  const submitForm = (formData: ProjectFormData) => {
    editProject(
      { projectId, formData },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["editProject", `project/${projectId}`],
          });
          toast.success(data);
          navigate("/");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el siguiente formulario para editar un proyecto
        </p>
        <nav className="my-5">
          <Link
            to="/"
            className="cursor-pointer bg-purple-400 px-5 py-2 text-xl text-white transition-all hover:bg-purple-500"
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="mt-10 rounded-lg bg-white p-10 shadow-lg"
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value={"Guardar Cambios"}
            className="w-full cursor-pointer bg-fuchsia-600 p-3 font-bold text-white uppercase transition-all hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  );
}

export default EditProjectForm;
