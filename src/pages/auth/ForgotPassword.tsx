import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { type ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";

export default function ForgotPassword() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleForgotPassword = (formData: ForgotPasswordForm) => {};

  return (
    <>
      <h1 className="text-3xl font-black text-white">
        Reestablecer contraseña
      </h1>
      <p className="mt-5 text-xl font-light text-white">
        ¿Olvidaste tu contraseña? Coloca tu email
        <span className="font-bold text-fuchsia-500">
          {" "}
          Y reestablece tu contraseña
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="mt-10 space-y-8 bg-white p-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full border border-gray-300 p-3"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="w-full cursor-pointer bg-fuchsia-600 p-3 text-xl font-black text-white hover:bg-fuchsia-700"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/login"}
          className="text-center font-normal text-gray-300"
        >
          Ya tienes cuenta?{" "}
          <span className="text-fuchsia-600">Iniciar sesión</span>
        </Link>

        <Link
          to={"/auth/register"}
          className="text-center font-normal text-gray-300"
        >
          ¿No tienes cuenta? <span className="text-fuchsia-600">Crear una</span>
        </Link>
      </nav>
    </>
  );
}
