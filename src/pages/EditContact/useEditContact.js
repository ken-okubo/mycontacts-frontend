import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
          controller.signal,
        );

        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
        setContactName(contact.name);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        navigate("/");
        toast({
          type: "error",
          text: "Ocorreu um erro ao carregar os dados do contato.",
          duration: 3000,
        });
      }
    }

    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, navigate]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);
      setContactName(contactData.name);

      toast({
        type: "success",
        text: "Contato atualizado com sucesso.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: "error",
        text: "Ocorreu um erro ao editar o contato.",
        duration: 3000,
      });
    }
  }
  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
