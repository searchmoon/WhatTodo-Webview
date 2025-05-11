import { useRef, useCallback } from "react";

interface UseLongPressProp {
  onLongPress: () => void;
  delay?: number; // 롱프레스 인식 시간 (ms)
  onClick?: () => void;
}

function useLongPress({ onLongPress, delay = 500 }: UseLongPressProp) {
  const timerRef = useRef<number | null>(null);

  const start = useCallback(() => {
    timerRef.current = window.setTimeout(() => {
      onLongPress();
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchCancel: clear,
  };
}

export default useLongPress;
