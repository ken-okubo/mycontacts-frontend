import { Container } from "./styles";

export default function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        type="text"
        placeholder="Pesquisar pelo nome..."
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}
