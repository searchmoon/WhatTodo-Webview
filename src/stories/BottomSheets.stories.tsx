import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import BottomSheets from "./BottomSheets";

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
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <BottomSheets open={open} setOpen={setOpen}>
          내용
        </BottomSheets>
      </>
    );
  },
};
