import { ReactNode } from "react";
import { useLongPress } from "@/hooks/useLongPress";

interface LongPressWrapperProps {
  onLongPress: () => void;
  onClick: (e: React.MouseEvent) => void;
  children: ReactNode;
}

export default function LongPressWrapper({
  onLongPress,
  onClick,
  children,
}: LongPressWrapperProps) {
  const longPressEvent = useLongPress({ onLongPress, onClick, delay: 500 });

  return <div {...longPressEvent}>{children}</div>;
}
