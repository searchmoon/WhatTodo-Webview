import { useRef, useCallback } from "react";

interface UseLongPressOptions {
  delay?: number;
  onLongPress: () => void;
  onClick: () => void;
}

export const useLongPress = ({
  onLongPress,
  delay = 500,
  onClick,
}: UseLongPressOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const startPress = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
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
      e.preventDefault();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (!isLongPressRef.current && onClick) {
        onClick();
      }
    },
    [onClick]
  );

  const cancelPress = useCallback((e: React.TouchEvent | React.MouseEvent) => {
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
