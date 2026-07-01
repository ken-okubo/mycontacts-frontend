import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const [isPending, startTransition] = useTransition();

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().startsWith(deferredSearchTerm.toLowerCase()),
    );
  }, [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(
    async (signal) => {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(
          orderBy,
          signal,
        );

        setContacts(contactsList);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        toast({
          type: "danger",
          text: "Ocorreu um erro ao buscar os contatos.",
        });
        setHasError(true);
        setContacts([]);
      } finally {
        setIsLoading(false);
      }
    },
    [orderBy],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadContacts(controller.signal);
    return () => {
      controller.abort();
    };
  }, [loadContacts]); // o orderBy após a virgula indica que o useEffect deve ser executado sempre que o valor de orderBy for alterado.

  const handleToggleOrderBy = useCallback(() => {
    startTransition(() => {
      setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    });
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
    setHasError(false);
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      toast({
        type: "success",
        text: "Contato deletado com sucesso!",
      });
      handleCloseDeleteModal();
      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id),
      );
    } catch {
      toast({
        type: "error",
        text: "Ocorreu um erro ao deletar o contato.",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }
  return {
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
  };
}
