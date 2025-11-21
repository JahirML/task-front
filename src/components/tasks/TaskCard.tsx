import useDeleteTask from "@/hooks/tasks/useDeleteTask";
import type { TaskProject } from "@/types/index";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDraggable } from "@dnd-kit/core";

type CardProps = {
  task: TaskProject;
  canEdit: boolean;
};

function TaskCard({ task, canEdit }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
    });
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const { deleteteTask } = useDeleteTask();
  const queryClient = useQueryClient();
  const projectId = params.projectId!;
  function editTask() {
    setSearchParams(`editTask=${task._id}`);
  }
  const handleDeleteTask: React.MouseEventHandler<HTMLButtonElement> = () => {
    deleteteTask(
      { projectId, taskId: task._id },
      {
        onSuccess: (data) => {
          toast.success(data);
          queryClient.invalidateQueries({
            queryKey: ["editProject", `project/${projectId}`],
          });
        },
      },
    );
  };
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: isDragging ? "none" : "transform 0.2s ease",
    zIndex: isDragging ? 1000 : 1,
    boxShadow: isDragging ? "0px 4px 12px rgba(0, 0, 0, 0.15)" : undefined,
    position: isDragging ? "relative" : undefined,
  } as React.CSSProperties;

  return (
    <li
      style={style}
      className="flex justify-between gap-3 border border-slate-300 bg-white p-5"
    >
      <div
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        className="flex min-w-0 flex-col gap-y-4"
      >
        <button
          type="button"
          className="cursor-pointer text-left text-xl font-bold text-slate-600"
          onClick={() => {
            setSearchParams(`viewTask=${task._id}`);
          }}
        >
          {task.name}
        </button>
        <p className="text-slate-500">{task.description}</p>
      </div>
      <div className="flex shrink-0 gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <button
                  type="button"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900"
                  onClick={() => {
                    setSearchParams(`viewTask=${task._id}`);
                  }}
                >
                  Ver Tarea
                </button>
              </Menu.Item>
              {canEdit && (
                <>
                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-gray-900"
                      onClick={editTask}
                    >
                      Editar Tarea
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-red-500"
                      onClick={handleDeleteTask}
                    >
                      Eliminar Tarea
                    </button>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}

export default TaskCard;
