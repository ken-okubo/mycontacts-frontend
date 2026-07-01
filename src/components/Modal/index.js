import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";
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
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containertId="modal-root">
      <Overlay $isLeaving={!visible} ref={animatedElementRef}>
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
