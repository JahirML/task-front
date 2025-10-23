import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

function useGetTaskById() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const projectId = params.projectId!;
  const taskId = searchParams.get("editTask") as string;

  const { data: task, isLoading } = useQuery({
    queryFn: () => getTaskById({ projectId, taskId }),
    queryKey: ["task", taskId],
    enabled: !!taskId,
  });
  return { taskId, task, isLoading };
}

export default useGetTaskById;
