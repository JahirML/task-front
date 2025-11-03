import { createAccountApi } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useCreatteAccount() {
  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: createAccountApi,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createAccount, isPending };
}

export default useCreatteAccount;
