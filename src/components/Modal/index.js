import Button from "../Button";
import ReactPortal from "../ReactPortal";
import { Container, Footer, Overlay } from "./styles";

export default function Modal({
  danger,
  visible,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal containertId="modal-root">
      <Overlay>
        <Container $danger={danger}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <button
              className="cancel-button"
              type="button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel || "Cancelar"}
            </button>
            <Button
              danger={danger}
              isLoading={isLoading || false}
              onClick={onConfirm}
            >
              {confirmLabel || "Deletar"}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
