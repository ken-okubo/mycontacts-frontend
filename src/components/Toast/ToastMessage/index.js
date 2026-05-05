import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";
import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import { Container } from "./styles";

export default function ToastMessage({ message, onRemoveMessage }) {
  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container type={message.type} onClick={handleRemoveToast}>
      {message.type === "success" && (
        <img
          src={checkCircleIcon}
          alt="Ícone de sucesso"
          width={24}
          height={24}
        />
      )}
      {message.type === "error" && (
        <img src={xCircleIcon} alt="Ícone de erro" width={24} height={24} />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
}
