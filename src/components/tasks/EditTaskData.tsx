import type { Task, TaskFormData } from "@/types/index";
import Modal from "@/ui/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import useGetTaskById from "@/hooks/tasks/useGetTaskById";

type Props = {
  task: Task;
};

function EditTaskData({ task }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    defaultValues: { name: task.name, description: task.description },
  });

  const navigate = useNavigate();
  function onClose() {
    navigate("", { replace: true });
  }

  function submitForm(formData: TaskFormData) {
    console.log(formData);
  }

  return (
    <Modal onClose={onClose}>
      <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle transition-all">
        <h3 className="my-5 text-4xl font-black">Editar Tarea</h3>

        <p className="text-xl font-bold">
          Realiza cambios a una tarea en {""}
          <span className="text-fuchsia-600">este formulario</span>
        </p>

        <form
          className="mt-10 space-y-3"
          onSubmit={handleSubmit(submitForm)}
          noValidate
        >
          <TaskForm register={register} errors={errors} />
          <input
            type="submit"
            className="w-full cursor-pointer bg-fuchsia-600 p-3 text-xl font-black text-white hover:bg-fuchsia-700"
            value="Guardar Tarea"
          />
        </form>
      </div>
    </Modal>
  );
}

export default EditTaskData;
