import type { TeamMember } from "@/types/index";

type Props = {
  user: TeamMember;
};

function SearchResult({ user }: Props) {
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex items-center justify-between">
        <p>{user.name}</p>
        <button className="cursor-pointer px-10 py-3 font-bold text-purple-600 transition-all hover:bg-purple-100">
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}

export default SearchResult;
