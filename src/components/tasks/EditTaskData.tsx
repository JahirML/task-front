import type { Project } from "@/types/index";

import EditTaskModal from "./EditTaskModal";
import useGetTaskById from "@/hooks/tasks/useGetTaskById";
import Spinner from "@/ui/Spinner";
import { Navigate } from "react-router-dom";

type Props = {
  projectId: Project["_id"];
};

function EditTaskData({ projectId }: Props) {
  const { task, isLoading, isError } = useGetTaskById();
  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={"/404"} />;
  if (task) return <EditTaskModal task={task} projectId={projectId} />;
}

export default EditTaskData;
