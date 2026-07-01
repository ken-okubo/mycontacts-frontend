import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";
import ReactPortal from "../ReactPortal";
import Spinner from "../Spinner";
import { Overlay } from "./styles";

export default function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containertId="loader-root">
      <Overlay $isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
