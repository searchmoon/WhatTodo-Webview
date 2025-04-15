import InputLine from "@/components/common/InputLine";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputLine> = {
  title: "Components/InputLine",
  component: InputLine,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof InputLine>;

export default meta;
type Story = StoryObj<typeof InputLine>;

export const DefaultInputLine: Story = {
  args: {},
  render: function Render(args) {
    return (
      <>
        <InputLine
          {...args}
          type="email"
          id="email"
          placeholder="기본 input"
        ></InputLine>
        <InputLine
          {...args}
          placeholder="에러 password input"
          type="password"
          id="password"
          isError={true}
          message="에러메세지"
        ></InputLine>
      </>
    );
  },
};
