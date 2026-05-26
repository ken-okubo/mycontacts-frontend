import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useIsMounted from "../../hooks/useIsMounted";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        if (isMounted()) {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        }
      } catch {
        if (isMounted()) {
          history.push("/");
          toast({
            type: "error",
            text: "Ocorreu um erro ao carregar os dados do contato.",
            duration: 3000,
          });
        }
      }
    }
    loadContact();
  }, [id, history, isMounted]);

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
