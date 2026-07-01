import magnifierQuestion from "../../../../assets/images/magnifier-question.svg";
import { Container } from "./styles";

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier Question" />
      <span>
        Nenhum contato encontrado com o nome informado{" "}
        <strong>"{searchTerm}"</strong>.
      </span>
    </Container>
  );
}
