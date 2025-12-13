import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { User, UserProfileForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/ProfileApi";
import { toast } from "react-toastify";

type ProfileProps = {
  data: User;
};

export default function ProfileForm({ data }: ProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileForm>({ defaultValues: data });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleEditProfile = (formData: UserProfileForm) => {
    mutate(formData);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-xl font-bold md:text-4xl">Mi Perfil</h1>
        <p className="mt-5 text-lg font-light text-gray-500 md:text-2xl">
          Aquí puedes actualizar tu información
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="mt-14 space-y-5 rounded-l bg-white p-10 shadow-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full border border-gray-200 p-3"
              {...register("name", {
                required: "Nombre de usuario es obligatoro",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm font-bold uppercase" htmlFor="password">
              E-mail
            </label>
            <input
              id="text"
              type="email"
              placeholder="Tu Email"
              className="w-full border border-gray-200 p-3"
              {...register("email", {
                required: "EL e-mail es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value="Guardar Cambios"
            className="w-full cursor-pointer bg-fuchsia-600 p-3 font-bold text-white uppercase transition-colors hover:bg-fuchsia-700"
          />
        </form>
      </div>
    </>
  );
}
