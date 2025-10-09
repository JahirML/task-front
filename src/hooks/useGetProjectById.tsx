import { getProjectById } from "@/api/ProjejectApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetProjectById() {
  const params = useParams();
  const projectId = params.projectId!;
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["editProject", `project/${projectId}`],
    queryFn: () => getProjectById(projectId),
  });
  return {
    project,
    isLoading,
    isError,
  };
}

export default useGetProjectById;
