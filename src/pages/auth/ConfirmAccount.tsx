import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";
import useConfirmAccount from "@/hooks/auth/useConfirmAccount";
export default function ConfirmAccount() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const { confirmAccount } = useConfirmAccount();
  function handleChange(token: ConfirmToken["token"]) {
    setToken(token);
  }
  function handleComplete(token: ConfirmToken["token"]) {
    confirmAccount({ token });
  }
  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="mt-5 text-2xl font-light text-white">
        Ingresa el código que recibiste {""}
        <span className="font-bold text-fuchsia-500"> por e-mail</span>
      </p>
      <form className="mt-10 space-y-8 bg-white p-10">
        <label className="block text-center text-2xl font-normal">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
            <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 p-3 placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/new-code"
          className="text-center font-normal text-gray-300"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
