import { createPortal } from "react-dom";
import { css } from "@emotion/react";

const modalStyles = css`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000000;
`;

const modalBoxStyles = css`
  background-color: #111;
  width: 300px;
  padding: 10px 20px;
  height: 80vh;
  margin: 10vh auto;
  position: relative;

  color: white;
`;

const modalButtonStyles = css`
  display: block;
  margin-bottom: 32px;
`;

function Modal({ children, onClose }: { children: any; onClose: () => void }) {
  return (
    <div css={modalStyles}>
      <div css={modalBoxStyles}>
        <button css={modalButtonStyles} onClick={onClose}>
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
