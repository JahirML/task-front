import { createTask as createTaskApi } from "@/api/TaskApi";
import { useMutation } from "@tanstack/react-query";

function useCreateTask() {
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: createTaskApi,
  });
  return { createTask, isPending };
}

export default useCreateTask;
