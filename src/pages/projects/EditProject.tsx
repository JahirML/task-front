import EditProjectForm from "@/components/projects/EditProjectForm";
import useGetProjectById from "@/hooks/projects/useGetProjectById";
import Spinner from "@/ui/Spinner";
import { Navigate } from "react-router-dom";

function EditProject() {
  const { project, isLoading, isError } = useGetProjectById();
  if (isLoading) return <Spinner />;
  if (isError) <Navigate to={"/404"} />;

  if (project) return <EditProjectForm project={project} />;
}

export default EditProject;
