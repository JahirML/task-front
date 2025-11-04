import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";

export default function NewPasswordToken() {
  const handleChange = (token: string) => {};
  const handleComplete = (token: string) => {};

  return (
    <>
      <form className="mt-10 space-y-8 rounded-lg bg-white p-10">
        <label className="block text-center text-2xl font-normal">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={"123456"}
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
          to="/auth/forgot-password"
          className="text-center font-normal text-gray-300"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
