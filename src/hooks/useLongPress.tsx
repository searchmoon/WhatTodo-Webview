import { useRef, useCallback } from "react";
import { TodoState } from "@/store/useTodoStore";

interface UseLongPressProp {
  onLongPress: (todo: TodoState) => void;
  delay?: number;
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void;
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
      const el = e.target as HTMLElement;
      if (el.closest(".no-propagation")) return;

      if ("touches" in e && e.cancelable) {
        e.preventDefault(); // prevent ghost click
      }
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
      const el = e.target as HTMLElement;
      if (el.closest(".no-propagation")) return;

      if ("touches" in e && e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (!longPressedRef.current && onClick) {
        onClick(e as React.MouseEvent | React.TouchEvent);
      }
    },
    [onClick]
  );

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchCancel: clear,
  };
}

export default useLongPress;
