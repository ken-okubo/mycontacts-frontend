import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function EditContact() {
  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        setContact(contactData);
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

  function handleSubmit() {
    //
  }

  return (
    <>
      {isLoading ? <Loader /> : null}
      <PageHeader title="Editar Contato" />
      <ContactForm
        key={contact.id}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        contact={contact}
      />
    </>
  );
}
