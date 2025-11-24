import type { Project, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import useEditStatus from "@/hooks/tasks/useEditStatus";
import { useQueryClient } from "@tanstack/react-query";

type TaskProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};
type GroupedTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};
const statusColors: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: " border-t-red-500 ",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-400",
  completed: "border-t-emerald-500",
};

function TaskList({ tasks, canEdit }: TaskProps) {
  const queryClient = useQueryClient();
  const { updateTaskStatus, projectId } = useEditStatus();
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  function handleDragEnd(e: DragEndEvent) {
    const { over, active } = e;
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      updateTaskStatus({ projectId, taskId, status });
      queryClient.setQueryData(
        ["editProject", `project/${projectId}`],
        (oldData: Project) => {
          console.log(oldData);
          const updatedTask = oldData.tasks.map((task) => {
            if (task._id === taskId) {
              return {
                ...task,
                status,
              };
            }
            return task;
          });
          return {
            ...oldData,
            tasks: updatedTask,
          };
        },
      );
    }
  }

  return (
    <>
      <h2 className="my-10 text-5xl font-black">Tareas</h2>

      <div className="grid grid-cols-5 gap-5 overflow-x-scroll pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => {
            return (
              <div key={status} className="w-full">
                <h3
                  className={`border border-t-8 border-slate-300 bg-white p-3 text-xl font-light capitalize ${statusColors[status]}`}
                >
                  {statusTranslations[status]}
                </h3>
                <DropTask status={status} />
                <ul className="mt-5 space-y-5">
                  {tasks.length === 0 ? (
                    <li className="pt-3 text-center text-gray-500">
                      No Hay tareas
                    </li>
                  ) : (
                    tasks.map((task) => (
                      <TaskCard key={task._id} task={task} canEdit={canEdit} />
                    ))
                  )}
                </ul>
              </div>
            );
          })}
        </DndContext>
      </div>
    </>
  );
}

export default TaskList;
