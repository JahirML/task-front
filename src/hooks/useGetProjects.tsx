import { getProjects } from "@/api/ProjejectApi";
import { useQuery } from "@tanstack/react-query";

function useGetProjects() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  return {
    projects,
    isLoading,
    isError,
  };
}

export default useGetProjects;
