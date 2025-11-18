import { deleteNote } from "@/api/NoteApi";
import useAuth from "@/hooks/auth/useAuth";
import type { Note } from "@/types/index";
import Spinner from "@/ui/Spinner";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  note: Note;
};

function NoteDetail({ note }: Props) {
  const { user, isLoading } = useAuth();
  const canDelete = useMemo(
    () => user?._id === note.createdBy._id,
    [user?._id, note.createdBy._id],
  );
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { projectId = "" } = useParams();
  const taskId = searchParams.get("viewTask") as string;

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["task", taskId],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function handleDeleteNote() {
    mutate({ projectId, taskId, noteId: note._id });
  }

  if (isLoading) return <Spinner />;
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p>
          {note.content} por{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          type="button"
          onClick={handleDeleteNote}
          className="ho cursor-pointer bg-red-600 p-2 text-xs font-bold text-white transition-colors hover:bg-red-700"
        >
          Eliminar
        </button>
      )}
    </div>
  );
}

export default NoteDetail;
