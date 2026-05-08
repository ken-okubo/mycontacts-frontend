import { useCallback, useEffect, useState } from "react";
import { toastEventManager } from "../../../utils/toast";
import ToastMessage from "../ToastMessage";
import { Container } from "./styles";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      const id = Math.random();

      setMessages((prevMessages) => [
        ...prevMessages,
        { id, type, text, duration },
      ]);
    }

    toastEventManager.on("addtoast", handleAddToast);

    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, []);

  const handleRemoveToast = useCallback((id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id),
    );
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveToast}
        />
      ))}
    </Container>
  );
}
