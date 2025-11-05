import { useForm } from "react-hook-form";
import { type UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "@/hooks/auth/useLogin";
import useAuth from "@/hooks/auth/useAuth";
import Spinner from "@/ui/Spinner";

export default function LoginPage() {
  const { login } = useLogin();
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = (formData: UserLoginForm) => login(formData);

  if (user) navigate("/", { replace: true });
  return (
    <>
      <h1 className="text-3xl font-black text-white">Iniciar sesión</h1>
      <p className="mt-5 text-xl font-light text-white">
        Inicia sesion y
        <span className="font-bold text-fuchsia-500">
          {" "}
          Comienza a planear tus proyectos
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-10 space-y-8 bg-white p-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full border border-gray-300 p-3"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-2xl font-normal">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full border border-gray-300 p-3"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full cursor-pointer bg-fuchsia-600 p-3 text-xl font-black text-white hover:bg-fuchsia-700"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center font-normal text-gray-300"
        >
          ¿No tienes cuenta? <span className="text-fuchsia-600">Crear una</span>
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center font-normal text-gray-300"
        >
          ¿Olvidaste tu contraseña?{" "}
          <span className="text-fuchsia-600">Reestablecer</span>
        </Link>
      </nav>
    </>
  );
}
