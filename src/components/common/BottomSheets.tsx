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
  isClose?: boolean;
}

function BottomSheets({ drawTrigger, drawerContent, title }: BottomSheetProp) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {drawTrigger}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {drawerContent(handleClose)}
      </DrawerContent>
    </Drawer>
  );
}

export default BottomSheets;
