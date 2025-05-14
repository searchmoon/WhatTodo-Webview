import { useRef, useCallback } from "react";
import { TodoState } from "@/store/useTodoStore";

interface UseLongPressProp {
  onLongPress: (todo: TodoState) => void;
  delay?: number;
  onClick?: (e: React.MouseEvent) => void;
  todo: TodoState;
}

function useLongPress({
  onLongPress,
  delay = 500,
  onClick,
  todo,
}: UseLongPressProp) {
  const timerRef = useRef<number | null>(null);
  const longPressedRef = useRef(false);

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      longPressedRef.current = false;
      timerRef.current = window.setTimeout(() => {
        longPressedRef.current = true;
        onLongPress(todo);
      }, delay);
    },
    [onLongPress, delay, todo]
  );

  const clear = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      // 롱프레스가 아니면 onClick 실행
      if (!longPressedRef.current && onClick) {
        onClick(e as React.MouseEvent);
      }
    },
    [onClick]
  );

  return {
    onMouseDown: start,
    onMouseUp: clear,
    // onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchCancel: clear,
  };
}

export default useLongPress;
