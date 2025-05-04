import { useRef, useCallback } from "react";

interface UseLongPressOptions {
  delay?: number;
  onLongPress: () => void;
  onClick: (e: React.MouseEvent) => void;
}

export const useLongPress = ({
  onLongPress,
  delay = 500,
  onClick,
}: UseLongPressOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const isInteractiveElement = (e: any) => {
    const target = e.target as HTMLElement;

    return (
      // 이런 요소일때 해당 이벤트는 무시하고 빠져나오도록 한다.
      target.closest("button") ||
      target.closest("a") ||
      target.closest("svg") ||
      target.closest("input") ||
      target.closest("textarea")
    );
  };

  const startPress = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isInteractiveElement(e)) return;

      e.preventDefault();
      isLongPressRef.current = false;
      timerRef.current = setTimeout(() => {
        onLongPress();
        isLongPressRef.current = true;
      }, delay);
    },
    [onLongPress, delay]
  );

  const endPress = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isInteractiveElement(e)) return;

      e.preventDefault();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (!isLongPressRef.current && onClick) {
        onClick(e as React.MouseEvent);
      }
    },
    [onClick]
  );

  const cancelPress = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (isInteractiveElement(e)) return;

    e.preventDefault();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onTouchStart: startPress,
    onTouchEnd: endPress,
    onTouchMove: cancelPress,
    onMouseDown: startPress,
    onMouseUp: endPress,
    onMouseLeave: cancelPress,
  };
};
