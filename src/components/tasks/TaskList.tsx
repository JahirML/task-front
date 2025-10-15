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
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusTranslations: { [key: string]: string } = {
  pending: "Pendiente",
  onHold: "En espera",
  inProgress: "En Progreso",
  underReview: "En revision",
  completed: "Completado",
};

const statusColors: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: " border-t-red-500 ",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-400",
  completed: "border-t-emerald-500",
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
            <h3
              className={`border border-t-8 border-slate-300 bg-white p-3 text-xl font-light capitalize ${statusColors[status]}`}
            >
              {statusTranslations[status]}
            </h3>
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
