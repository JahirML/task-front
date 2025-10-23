import { updateTask } from "@/api/TaskApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useUpdateTask() {
  const { mutate: editTask, isPending } = useMutation({
    mutationFn: updateTask,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editTask, isPending };
}

export default useUpdateTask;
