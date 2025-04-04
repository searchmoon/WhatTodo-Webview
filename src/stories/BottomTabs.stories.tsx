import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { House } from "lucide-react";
import { Plus } from "lucide-react";

import BottomTabs from "./BottomTabs";

const meta: Meta<typeof BottomTabs> = {
  title: "Components/BottomTabs",
  component: BottomTabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof BottomTabs>;

export default meta;
type Story = StoryObj<typeof BottomTabs>;

const iconStyle = "h-6 w-6";

const tabsOption = [
  {
    value: "home",
    icon: <House className={iconStyle} />,
    activeIcon: <House color="red" className={iconStyle} />,
    label: "홈",
  },
  {
    value: "plus",
    icon: <Plus className={iconStyle} />,
    activeIcon: <Plus className={iconStyle} />,
    label: "프로필",
  },
  {
    value: "plus",
    icon: <Plus className={iconStyle} />,
    activeIcon: <Plus className={iconStyle} />,
    label: "프로필",
  },
  {
    value: "plus",
    icon: <Plus className={iconStyle} />,
    activeIcon: <Plus color="red" className={iconStyle} />,
    label: "프로필",
  },
  {
    value: "plus",
    icon: <Plus className={iconStyle} />,
    activeIcon: <Plus color="red" className={iconStyle} />,
    label: "프로필",
  },
];

export const BottomTab: Story = {
  args: {},
  render: function Render(args) {
    const [activeTab, setActiveTab] = useState(
      tabsOption[0]?.value || undefined
    );

    return (
      <BottomTabs
        {...args}
        tabsOption={tabsOption}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  },
};
