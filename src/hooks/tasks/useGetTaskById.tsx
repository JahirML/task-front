import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useGetTaskById() {
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("editTask");

  const { data: task, isLoading } = useQuery({
    queryFn: () => getTaskById,
    queryKey: ["task", taskId],
  });
  return { taskId, task, isLoading };
}

export default useGetTaskById;
