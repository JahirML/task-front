import { loginApi } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Iniciando sesion");
      navigate("/");
    },
  });

  return { login, isPending };
}

export default useLogin;
