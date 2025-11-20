import { useDroppable } from "@dnd-kit/core";

type Props = {
  status: string;
};
function DropTask({ status }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });
  return (
    <div
      ref={setNodeRef}
      className="mt-5 grid place-content-center border-2 border-dashed border-slate-500 p-2 text-xs font-semibold text-slate-500 uppercase"
    >
      Soltar tarea aqui
    </div>
  );
}

export default DropTask;
