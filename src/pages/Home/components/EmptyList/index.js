import emptyBox from "../../../../assets/images/emptybox.svg";
import { Container } from "./styles";

export default function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="Empty Box" />
      <p>
        Você ainda não tem nenhum contato cadastrado. Clique no botão{" "}
        <strong>"Novo Contato"</strong> para adicionar o seu primeiro.
      </p>
    </Container>
  );
}
