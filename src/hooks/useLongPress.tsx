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
        e.preventDefault();
      }

      longPressedRef.current = false;

      timerRef.current = window.setTimeout(() => {
        longPressedRef.current = true;
        onLongPress(todo);

        // 다음 click 이벤트 무력화
        const preventClick = (event: MouseEvent) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          document.removeEventListener("click", preventClick, true);
        };
        document.addEventListener("click", preventClick, true);
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

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // 롱프레스가 아니면 클릭 이벤트
      if (!longPressedRef.current && onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  return {
    onPointerDown: start,
    onPointerUp: clear,
  };
}

export default useLongPress;
