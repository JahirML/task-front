import type { Project } from "@/types/index";

import EditTaskModal from "./EditTaskModal";
import useGetTaskById from "@/hooks/tasks/useGetTaskById";
import Spinner from "@/ui/Spinner";

type Props = {
  projectId: Project["_id"];
};

function EditTaskData({ projectId }: Props) {
  const { task, isLoading } = useGetTaskById();
  if (isLoading) return <Spinner />;
  if (task) return <EditTaskModal task={task} projectId={projectId} />;
}

export default EditTaskData;
