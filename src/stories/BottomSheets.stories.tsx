import BottomSheets from "@/components/common/BottomSheets";
import { DrawerTrigger } from "@/components/ui/drawer";
import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react";
import CreateTodoContent from "../components/contents/bottomSheets/CreateTodoContent";

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
              <button className="bg-gray-400 p-2 rounded-full absolute z-10 bottom-2 right-2 cursor-pointer">
                <Plus color="#fff" />
              </button>
            </DrawerTrigger>
          }
          drawerContent={(onClose) => <CreateTodoContent onClose={onClose} />}
        />
      </>
    );
  },
};
