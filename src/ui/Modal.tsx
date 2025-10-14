import { useRef, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
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

  return (
    <div
      onClick={handleCloseModal}
      ref={ref}
      className={`fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`relative w-11/12 max-w-[700px] rounded-lg bg-white px-10 py-12 shadow-2xl ${
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
