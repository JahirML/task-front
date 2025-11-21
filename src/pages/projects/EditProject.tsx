import { getPartialProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";
import Spinner from "@/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

function EditProject() {
  const params = useParams();
  const projectId = params.projectId!;
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["editProject", `project/${projectId}`],
    queryFn: () => getPartialProjectById(projectId),
  });
  console.log(project);

  if (isLoading) return <Spinner />;
  if (isError) <Navigate to={"/404"} />;

  if (project) return <EditProjectForm project={project} />;
}

export default EditProject;
