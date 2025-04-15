import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
interface BottomSheetProp {
  drawTrigger: React.ReactNode;
  drawerContent: React.ReactNode;
  title?: string;
}

function BottomSheets({ drawTrigger, drawerContent, title }: BottomSheetProp) {
  return (
    <Drawer>
      {drawTrigger}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {drawerContent}
      </DrawerContent>
    </Drawer>
  );
}

export default BottomSheets;
