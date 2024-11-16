import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  modalStyle?: string;
  titleStyle?: string;
  closeBtnStyle?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  modalStyle = "",
  titleStyle = "",
  closeBtnStyle = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`bg-white shadow-md p-4 w-full max-w-md rounded-md ${modalStyle}`}>
            <div className="flex justify-between items-center">
            {title && (
                <h2 className={`text-lg font-semibold flex-1 text-center ${titleStyle}`}>
                {title}
                </h2>
            )}
            <button
                onClick={onClose}
                className={`text-gray-900 text-2xl hover:text-black ${closeBtnStyle}`}
            >
                &times;
            </button>
            </div>
            <div className="m-4">{children}</div>
        </div>
    </div>
  );
};


export default Modal;
