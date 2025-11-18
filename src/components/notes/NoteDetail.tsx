import useAuth from "@/hooks/auth/useAuth";
import type { Note } from "@/types/index";
import Spinner from "@/ui/Spinner";
import { formatDate } from "@/utils/utils";
import { useMemo } from "react";

type Props = {
  note: Note;
};

function NoteDetail({ note }: Props) {
  const { user, isLoading } = useAuth();
  const canDelete = useMemo(
    () => user?._id === note.createdBy._id,
    [user?._id, note.createdBy._id],
  );

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
          className="ho cursor-pointer bg-red-600 p-2 text-xs font-bold text-white transition-colors hover:bg-red-700"
        >
          Eliminar
        </button>
      )}
    </div>
  );
}

export default NoteDetail;
