import ReactPortal from "../ReactPortal";
import Spinner from "../Spinner";
import { Overlay } from "./styles";

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal containertId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
