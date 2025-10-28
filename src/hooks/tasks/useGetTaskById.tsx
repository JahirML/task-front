import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

function useGetTaskById() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const projectId = params.projectId!;
  const taskId =
    searchParams.get("editTask") || (searchParams.get("viewTask") as string);

  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getTaskById({ projectId, taskId }),
    queryKey: ["task", taskId],
    enabled: !!taskId,
  });
  return { taskId, task, isLoading, isError, error };
}

export default useGetTaskById;
