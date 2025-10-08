import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { toast } from "react-toastify";
import useCreateProject from "@/hooks/useCreateProject";

function CreateProjetPage() {
  const { createProject } = useCreateProject();
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const { register, handleSubmit, formState } = useForm({
    defaultValues: initialValues,
  });
  const { errors } = formState;

  async function submitForm(formData: ProjectFormData) {
    createProject(formData, {
      onSuccess: (data) => {
        toast.success(data);
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="mt-5 text-2xl font-light text-gray-500">
          Llena el siguiente formulario para crear un proyecto
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
            value={"Crear proyecto"}
            className="w-full cursor-pointer bg-fuchsia-600 p-3 font-bold text-white uppercase transition-all hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  );
}

export default CreateProjetPage;
