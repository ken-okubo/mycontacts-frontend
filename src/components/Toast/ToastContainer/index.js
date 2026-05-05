import { useEffect, useState } from "react";
import { toastEventManager } from "../../../utils/toast";
import ToastMessage from "../ToastMessage";
import { Container } from "./styles";

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      const id = Math.random();

      setMessages((prevMessages) => [...prevMessages, { id, type, text }]);
    }

    toastEventManager.on("addtoast", handleAddToast);

    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, []);

  function handleRemoveToast(id) {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id),
    );
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          id={message.id}
          type={message.type}
          text={message.text}
          onRemoveMessage={() => handleRemoveToast(message.id)}
        />
      ))}
    </Container>
  );
}
