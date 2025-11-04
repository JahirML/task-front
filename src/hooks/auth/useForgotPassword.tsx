import { forgotPassword } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useForgotPassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  return { resetPassword, isPending };
}

export default useForgotPassword;
