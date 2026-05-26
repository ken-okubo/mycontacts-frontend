import ContactForm from "../../components/ContactForm";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import useEditContact from "./useEditContact";

export default function EditContact() {
  const { isLoading, contactName, contactFormRef, handleSubmit } =
    useEditContact();

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
