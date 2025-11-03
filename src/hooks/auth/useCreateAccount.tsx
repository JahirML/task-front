import { createAccountApi } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useCreateAccount() {
  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: createAccountApi,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createAccount, isPending };
}

export default useCreateAccount;
