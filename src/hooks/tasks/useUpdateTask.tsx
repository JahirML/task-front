import { updateTask } from "@/api/TaskApi";
import { useMutation } from "@tanstack/react-query";

function useUpdateTask() {
  const { mutate: editTask, isPending } = useMutation({
    mutationFn: updateTask,
  });
  return { editTask, isPending };
}

export default useUpdateTask;
