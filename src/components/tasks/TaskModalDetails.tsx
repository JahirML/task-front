import useGetTaskById from "@/hooks/tasks/useGetTaskById";
import { statusTranslations } from "@/locales/es";
import Modal from "@/ui/Modal";
import { formatDate } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TaskModalDetails() {
  const navigate = useNavigate();
  const { task, isError, error } = useGetTaskById();

  if (isError) {
    toast.error(error?.message, { toastId: "error" });
    navigate("", { replace: true });
  }
  if (task)
    return (
      <>
        <Modal>
          <div>
            <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle">
              <p className="text-sm text-slate-400">
                Agregada el: {formatDate(task.createdAt)}
              </p>
              <p className="text-sm text-slate-400">
                Última actualización: {formatDate(task.updatedAt)}{" "}
              </p>
              <h3 className="my-5 text-4xl font-black text-slate-600">
                {task.name}
              </h3>
              <p className="mb-2 text-lg text-slate-500">
                Descripción: {task.description}
              </p>
              <div className="my-5 space-y-3">
                <label className="font-bold">
                  Estado Actual:{" "}
                  <select
                    name=""
                    id=""
                    className="w-full border border-gray-300 bg-white p-3"
                    defaultValue={task.status}
                  >
                    {Object.entries(statusTranslations).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
}

export default TaskModalDetails;
