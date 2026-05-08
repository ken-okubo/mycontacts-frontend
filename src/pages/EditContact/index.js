import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

export default function EditContact() {
  function handleSubmit() {
    //
  }
  return (
    <>
      <PageHeader title="Editar Contato" />
      <ContactForm buttonLabel="Salvar alterações" onSubmit={handleSubmit} />
    </>
  );
}
