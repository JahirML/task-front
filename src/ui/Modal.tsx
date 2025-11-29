import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const navigate = useNavigate();
  function onClose() {
    navigate("", { replace: true });
  }
  const ref = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === ref.current) startClosing();
  };

  const startClosing = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={handleCloseModal}
      ref={ref}
      className={`fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`relative max-h-4/5 w-11/12 max-w-[700px] overflow-y-auto rounded-lg bg-white px-10 py-12 shadow-2xl 2xl:max-h-[800px] ${
          isClosing ? "animate-modal-hide" : "animate-modal-show"
        }`}
      >
        <button
          onClick={startClosing}
          className="absolute top-0 right-3 cursor-pointer text-3xl font-medium text-gray-500 transition-all hover:text-gray-800"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
