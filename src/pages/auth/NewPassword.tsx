import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

function NewPassword() {
  const [isValidToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  return (
    <>
      <h1 className="text-3xl font-black text-white">
        Reestablecer contraseña
      </h1>
      <p className="mt-5 text-xl font-light text-white">
        ¿Olvidaste tu contraseña? Coloca tu email
        <span className="font-bold text-fuchsia-500">
          {" "}
          Ingresa el código que resiviste por correo
        </span>
      </p>

      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}

export default NewPassword;
