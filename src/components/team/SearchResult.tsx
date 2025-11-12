import { addUserToProject } from "@/api/TeamApi";
import type { TeamMember } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { replace, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  user: TeamMember;
  resetData: () => void;
};

function SearchResult({ user, resetData }: Props) {
  const { projectId = "" } = useParams();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      resetData();
    },
  });
  function handleAddUser() {
    mutate({ projectId, id: user._id });
  }
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex items-center justify-between">
        <p>{user.name}</p>
        <button
          onClick={handleAddUser}
          className="cursor-pointer px-10 py-3 font-bold text-purple-600 transition-all hover:bg-purple-100"
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}

export default SearchResult;
