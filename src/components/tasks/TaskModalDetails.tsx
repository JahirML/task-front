import useGetTaskById from "@/hooks/tasks/useGetTaskById";
import Modal from "@/ui/Modal";
import { toast } from "react-toastify";

function TaskModalDetails() {
  const { task, isError, isLoading, error } = useGetTaskById();
  // console.log(task);
  if (isError) {
    toast.error(error?.message);
  }
  return (
    <>
      <Modal>
        <div>
          <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle">
            <p className="text-sm text-slate-400">Agregada el: </p>
            <p className="text-sm text-slate-400">Última actualización: </p>
            <h3 className="my-5 text-4xl font-black text-slate-600">
              Titulo aquí
            </h3>
            <p className="mb-2 text-lg text-slate-500">Descripción:</p>
            <div className="my-5 space-y-3">
              <label className="font-bold">Estado Actual:</label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TaskModalDetails;
