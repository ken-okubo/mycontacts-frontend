import Spinner from "../Spinner";
import { Container } from "./styles";

export default function FormGroup({ children, error, $isLoading }) {
  return (
    <Container $isLoading={$isLoading}>
      <div className="form-item">
        {children}
        {$isLoading && (
          <div className="loader">
            <Spinner $size={12} />
          </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}
