import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";
import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import { Container } from "./styles";

export default function ToastMessage({ id, text, type, onRemoveMessage }) {
  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container type={type} onClick={handleRemoveToast}>
      {type === "success" && (
        <img
          src={checkCircleIcon}
          alt="Ícone de sucesso"
          width={24}
          height={24}
        />
      )}
      {type === "error" && (
        <img src={xCircleIcon} alt="Ícone de erro" width={24} height={24} />
      )}
      <strong>{text}</strong>
    </Container>
  );
}
