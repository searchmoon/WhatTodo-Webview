import BottomSheets from "@/components/common/BottomSheets";
import TodoContent from "@/components/contents/bottomSheets/TodoContent";
import { DrawerTrigger } from "@/components/ui/drawer";
import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react";

const meta: Meta<typeof BottomSheets> = {
  title: "Components/BottomSheets",
  component: BottomSheets,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BottomSheets>;

export default meta;
type Story = StoryObj<typeof BottomSheets>;

export const BottomSheet: Story = {
  args: {},
  render: function Render() {
    return (
      <>
        <BottomSheets
          drawTrigger={
            <DrawerTrigger>
              <Plus color="#fff" />
            </DrawerTrigger>
          }
          drawerContent={(onClose) => <TodoContent onClose={onClose} />}
        />
      </>
    );
  },
};
