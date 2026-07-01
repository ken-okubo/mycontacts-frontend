import { Container } from "../../components/App/styles";
import Modal from "../../components/Modal";
import ContactsList from "./components/ContactsList";
import EmptyList from "./components/EmptyList";
import ErrorStatus from "./components/ErrorStatus";
import Header from "./components/Header";
import InputSearch from "./components/InputSearch";
import SearchNotFoundContainer from "./components/SearchNotFound";

import Loader from "../../components/Loader";
import useHome from "./useHome";

export default function Home() {
  const {
    isPending,
    contacts,
    orderBy,
    searchTerm,
    isLoading,
    hasError,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    filteredContacts,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      {isLoading && <Loader isLoading={isLoading} />}

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFoundContainer searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <div
            style={{
              opacity: isPending ? 0.6 : 1,
              transition: "opacity 0.2s ease-in",
            }}
          >
            <ContactsList
              filteredContacts={filteredContacts}
              orderBy={orderBy}
              onToggleOrderBy={handleToggleOrderBy}
              onDeleteContact={handleDeleteContact}
            />
          </div>

          <Modal
            danger
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
            title={`Tem certeza que deseja deletar o contato "${contactBeingDeleted?.name}"?`}
            cancelLabel="Cancelar"
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>
              Esta ação é irreversível e pode afetar permanentemente seus dados.
            </p>
          </Modal>
        </>
      )}
    </Container>
  );
}
