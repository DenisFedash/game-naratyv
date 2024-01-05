// components/ShapesModal.tsx
import React from "react";
import Modal from "react-modal";

interface ShapesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShape: (shape: string) => void;
}

const ShapesModal: React.FC<ShapesModalProps> = ({
  isOpen,
  onClose,
  onSelectShape,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Choose a Shape"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Choose a Shape</h2>
        <button className="mb-2" onClick={() => onSelectShape("circle")}>
          Circle
        </button>
        <button className="mb-2" onClick={() => onSelectShape("square")}>
          Square
        </button>
        <button onClick={() => onSelectShape("triangle")}>Triangle</button>
      </div>
    </Modal>
  );
};

export default ShapesModal;
