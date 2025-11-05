import { confirmAccountApi } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useConfirmAccount() {
  const navigate = useNavigate();
  const { mutate: confirmAccount, isPending } = useMutation({
    mutationFn: confirmAccountApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
    },
  });

  return { confirmAccount, isPending };
}

export default useConfirmAccount;
