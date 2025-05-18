import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
interface BottomSheetProp {
  drawTrigger: React.ReactNode;
  drawerContent: (onClose: () => void) => React.ReactNode;
  title?: string;
  // isClose?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export default function BottomSheets({
  drawTrigger,
  drawerContent,
  title,
  open,
  onOpenChange,
}: BottomSheetProp) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const setIsOpen = isControlled ? onOpenChange : setUncontrolledOpen;

  const handleClose = () => setIsOpen(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {drawTrigger}
      <DrawerContent>
        <DrawerHeader className="p-3">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {drawerContent(handleClose)}
      </DrawerContent>
    </Drawer>
  );
}
