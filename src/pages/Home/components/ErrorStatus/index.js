import sad from "../../../../assets/images/sad.svg";
import Button from "../../../../components/Button";
import { Container } from "./styles";

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="Sad" />
      <div className="details">
        <span>
          <strong>Ocorreu um erro ao carregar os contatos.</strong>
        </span>

        <Button onClick={onTryAgain}>Tentar novamente</Button>
      </div>
    </Container>
  );
}
