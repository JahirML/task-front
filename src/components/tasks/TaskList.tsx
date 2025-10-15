import type { Task } from "@/types/index";
import TaskCard from "./TaskCard";

type TaskProps = {
  tasks: Task[];
};
type GroupedTasks = {
  [key: string]: Task[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  inProgress: [],
  onHold: [],
  underReview: [],
  completed: [],
};

function TaskList({ tasks }: TaskProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);
  console.log(groupedTasks);
  return (
    <>
      <h2 className="my-10 text-5xl font-black">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll pb-32 2xl:overflow-auto">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:w-1/5 2xl:min-w-0">
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="pt-3 text-center text-gray-500">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskList;
