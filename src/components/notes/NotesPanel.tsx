import type { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesProps = {
  notes: Task["notes"];
};

function NotesPanel({ notes }: NotesProps) {
  return (
    <>
      <AddNoteForm />
      <div className="mt-10">
        {notes.length ? (
          <>
            <p className="my-2 text-2xl font-bold text-slate-600">Notas:</p>
            <div className="my-scroll max-h-60 divide-y divide-gray-100 overflow-y-auto">
              {notes.map((note) => (
                <NoteDetail key={note._id} note={note} />
              ))}
            </div>
          </>
        ) : (
          <p className="pt-3 text-center text-gray-500">No hay notas</p>
        )}
      </div>
    </>
  );
}

export default NotesPanel;
