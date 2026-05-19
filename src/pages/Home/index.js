import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import emptyBox from "../../assets/images/emptybox.svg";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";
import sad from "../../assets/images/sad.svg";
import { Container } from "../../components/App/styles";
import Button from "../../components/Button";
import {
  Card,
  EmptyBox,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  SearchNotFoundContainer,
} from "./styles";

import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  // useMemo é um hook do React que memoriza o resultado de uma função e só a reexecuta quando as dependências especificadas mudam.
  // Ele é útil para otimizar o desempenho, evitando cálculos desnecessários em cada renderização.
  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
      // O método filter() é usado para criar um novo array com todos os elementos que passam no teste implementado pela função fornecida.
      // O método includes() é usado para determinar se um array inclui um determinado elemento, retornando true ou false conforme apropriado.
    );
  }, [contacts, searchTerm]);

  // useCallback é um hook do React que retorna uma função memoizada, ou seja, uma função que só é recriada quando as dependências especificadas mudam.
  // Ele é útil para otimizar o desempenho, evitando a criação de funções desnecessárias em cada renderização, especialmente quando essas funções são passadas como props para componentes filhos.
  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);
      await ContactsService.listContacts(orderBy);

      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]); // o orderBy após a virgula indica que o useEffect deve ser executado sempre que o valor de orderBy for alterado.

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
    setHasError(false);
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

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
        type: "danger",
        text: "Ocorreu um erro ao deletar o contato.",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <Container>
      {isLoading && <Loader isLoading={isLoading} />}

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

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquisar pelo nome..."
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        $justifyContent={
          hasError
            ? "flex-end"
            : contacts.length > 0
              ? "space-between"
              : "center"
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? " contato" : " contatos"}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <span>
              <strong>Ocorreu um erro ao carregar os contatos.</strong>
            </span>

            <Button onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyBox>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhum contato cadastrado Clique no botão{" "}
                <strong>"Novo Contato"</strong> para adicionar o seu primeiro.
              </p>
            </EmptyBox>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />
              <span>
                Nenhum contato encontrado com o nome informado{" "}
                <strong>"{searchTerm}"</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
            <ListHeader $orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteContact(contact);
                  }}
                >
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}

// SOP => Same Origin Policy -> Política de mesma origem (mesmo protocolo, mesma porta e mesmo domínio).

// Origem: protocolo://domínio:porta
// Saída: http://localhost:3000
// Destino: http://localhost:3000 (mesma origem) -> Acesso permitido
// Destino: https://localhost:3000 (origem diferente) -> Acesso negado
// Destino: http://localhost:4000 (origem diferente) -> Acesso negado

// SOP só existe em navegadores, ou seja, não existe em servidores.
// O SOP é uma medida de segurança implementada pelos navegadores para impedir que scripts maliciosos acessem
// recursos de um site diferente daquele que os originou.
// Ele restringe o acesso a recursos (como cookies, localStorage, etc.) apenas ao mesmo domínio, protocolo e porta.

// CORS => Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens diferentes
// O CORS é um mecanismo que permite que recursos de um site sejam acessados por outro site, mesmo que estejam em origens diferentes.
// Ele é implementado pelos servidores, que podem configurar quais origens têm permissão para acessar seus recursos.
// O CORS é uma solução para o problema do SOP, permitindo que sites legítimos acessem recursos de outros sites de forma segura.

// Reguisição preflight => Requisição prévia feita pelo navegador para verificar se o servidor permite a requisição real (com métodos como POST, PUT, DELETE, etc.) de uma origem diferente.
// O navegador envia uma requisição OPTIONS para o servidor, e o servidor responde com os métodos e cabeçalhos permitidos.
// Se a resposta for positiva, o navegador prossegue com a requisição real. Caso contrário, a requisição é bloqueada pelo navegador.
