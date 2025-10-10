import useGetProjectById from "@/hooks/useGetProjectById";
import Spinner from "@/ui/Spinner";

function ProjectDetails() {
  const { project, isLoading, isError } = useGetProjectById();
  if (isLoading) return <Spinner />;
  return <div>s</div>;
}

export default ProjectDetails;
