import { deleteProject as deleteProjectApi } from "@/api/ProjectApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteProject, isPending };
}

export default useDeleteProject;
