import Modal from "@/ui/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import AddMemberForm from "./AddMemberForm";

function AddMemberModal() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const addMember = queryParams.get("addMember");
  const show = addMember ? true : false;
  if (show)
    return (
      <Modal>
        <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle">
          <h3 className="my-3 text-2xl font-black">
            Agregar Integrante al equipo
          </h3>
          <p className="text-lg font-bold">
            Busca el nuevo integrante por email {""}
            <span className="text-fuchsia-600">para agregarlo al proyecto</span>
          </p>
          <AddMemberForm />
        </div>
      </Modal>
    );
}

export default AddMemberModal;
