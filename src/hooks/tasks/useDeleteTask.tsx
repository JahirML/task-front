import { deleteteTask as deleteteTaskApi } from "@/api/TaskApi";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

function useDeleteTask() {
  const { mutate: deleteteTask, isPending } = useMutation({
    mutationFn: deleteteTaskApi,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteteTask, isPending };
}

export default useDeleteTask;
