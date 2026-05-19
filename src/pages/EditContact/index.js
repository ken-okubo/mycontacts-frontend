import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldsValues(contact);
        setContactName(contact.name);

        setIsLoading(false);
      } catch {
        history.push("/");
        toast({
          type: "error",
          text: "Ocorreu um erro ao carregar os dados do contato.",
          duration: 3000,
        });
      }
    }
    loadContact();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
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

  return (
    <>
      {isLoading ? <Loader /> : null}
      <PageHeader
        title={isLoading ? "Carregando..." : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
