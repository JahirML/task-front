import type { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";

type Props = {
  note: Note;
};

function NoteDetail({ note }: Props) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p>
          {note.content} por{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
    </div>
  );
}

export default NoteDetail;
