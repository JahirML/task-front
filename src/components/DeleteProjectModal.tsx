import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import useDeleteProject from "@/hooks/projects/useDeleteProject";
import Modal from "@/ui/Modal";
import type { CheckPasswordForm } from "../types";
import { useMutation } from "@tanstack/react-query";
import { checkPassword } from "@/api/AuthApi";
import { toast } from "react-toastify";
// import ErrorMessage from "../ErrorMessage";

export default function DeleteProjectModal() {
  const initialValues = {
    password: "",
  };
  const { deleteProject } = useDeleteProject();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get("deleteProject")!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const checkUserPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (err) => toast.error(err.message),
  });
  const handleForm = async (formData: CheckPasswordForm) => {
    await checkUserPasswordMutation.mutateAsync(formData);
    deleteProject(deleteProjectId, {
      onSuccess: () => {
        navigate("", { replace: true });
      },
    });
  };

  return (
    <Modal>
      <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle transition-all">
        <h3 className="my-5 text-4xl font-black">Eliminar Proyecto </h3>

        <p className="text-xl font-bold">
          Confirma la eliminación del proyecto {""}
          <span className="text-fuchsia-600">colocando tu password</span>
        </p>

        <form
          className="mt-10 space-y-5"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className="flex flex-col gap-3">
            <label className="text-2xl font-normal" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password Inicio de Sesión"
              className="w-full border border-gray-300 p-3"
              {...register("password", {
                required: "El password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            className="w-full cursor-pointer bg-fuchsia-600 p-3 text-xl font-black text-white hover:bg-fuchsia-700"
            value="Eliminar Proyecto"
          />
        </form>
      </div>
    </Modal>
  );
}
