import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export default function BottomSheets({
  children,
  open,
  setOpen,
  className,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}) {
  const handleDismiss = () => {
    setOpen((prev) => !prev);
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={handleDismiss}
      className={cn(
        "custom-bottom-sheet",
        "[&_[data-rsbs-overlay]]:bg-grayScale01",
        "[&_[data-rsbs-header]]:relative [&_[data-rsbs-header]]:h-[22px] [&_[data-rsbs-header]]:rounded-t-2xl [&_[data-rsbs-header]]:text-center",
        "[&_[data-rsbs-header]]:before:bg-grayScale05 [&_[data-rsbs-header]]:before:absolute [&_[data-rsbs-header]]:before:top-2 [&_[data-rsbs-header]]:before:left-1/2 [&_[data-rsbs-header]]:before:h-[2px] [&_[data-rsbs-header]]:before:w-[33px] [&_[data-rsbs-header]]:before:-translate-x-1/2 [&_[data-rsbs-header]]:before:content-['']",
        className
      )}
    >
      {children}
    </BottomSheet>
  );
}
