import "./modal.scss";
import { createPortal } from "react-dom";

function Modal({ children, onClose }: { children: any; onClose: () => void }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <button className="modal__button" onClick={onClose}>
          🅧
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ModalPortal({
  children,
  onClose,
}: {
  children: any;
  onClose: () => void;
}) {
  return createPortal(
    <Modal onClose={onClose}>{children}</Modal>,
    document.getElementById("modal-root") as HTMLDivElement
  );
}
