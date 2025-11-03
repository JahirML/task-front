import { confirmAccountApi } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useConfirmAccount() {
  const { mutate: confirmAccount, isPending } = useMutation({
    mutationFn: confirmAccountApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  return { confirmAccount, isPending };
}

export default useConfirmAccount;
