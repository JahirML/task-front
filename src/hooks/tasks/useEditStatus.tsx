import { updateTaskStatus as updateTaskStatusApi } from "@/api/TaskApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function useEditStatus() {
  const queryClient = useQueryClient();
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.pathname);
  const taskId = queryParams.get("viewTask")!;
  const projectId = params.projectId!;
  const { mutate: updateTaskStatus } = useMutation({
    mutationFn: updateTaskStatusApi,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["editProject", `project/${projectId}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateTaskStatus, taskId, projectId };
}

export default useEditStatus;
