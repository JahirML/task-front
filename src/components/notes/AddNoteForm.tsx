import type { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteApi";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "react-router-dom";

function AddNoteForm() {
  const initiaValues: NoteFormData = {
    content: "",
  };
  const [searchParams] = useSearchParams();
  const { projectId = "" } = useParams();
  const queryClient = useQueryClient();
  const taskId = searchParams.get("viewTask") as string;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initiaValues,
  });
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function submitForm(formData: NoteFormData) {
    mutate({
      taskId,
      projectId,
      formData,
    });
  }
  return (
    <form onSubmit={handleSubmit(submitForm)} noValidate className="space-y-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear Nota
        </label>
        <input
          type="text"
          id="content"
          placeholder="Contenido de la nota"
          className="w-full border border-gray-300 p-3"
          {...register("content", {
            required: "El contenido de la nota es obligatorios",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <input
        type="submit"
        value="Crear Nota"
        className="w-full cursor-pointer bg-fuchsia-600 p-2 font-black text-white transition-colors hover:bg-fuchsia-700"
      />
    </form>
  );
}

export default AddNoteForm;
