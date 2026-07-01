import { useEffect, useRef, useState } from "react";

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const animatedRef = animatedElementRef.current;
    if (!visible && animatedRef) {
      animatedRef.addEventListener("animationend", handleAnimationEnd, {
        once: true,
      });
    }
  }, [visible]);

  return { shouldRender, animatedElementRef };
}
