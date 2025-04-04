import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface tabsOptionProp {
  value: string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  label?: string;
}

interface IconTabsProp {
  tabsOption: tabsOptionProp[];
  activeTab: string | undefined;
  setActiveTab: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function BottomTabs({
  tabsOption,
  activeTab,
  setActiveTab,
  ...props
}: IconTabsProp) {
  return (
    <Tabs
      defaultValue={tabsOption[0]?.value}
      onValueChange={(value) => setActiveTab(value)}
      value={activeTab}
      className="border-grayScale02 mx-4 mt-[7px] mb-[34px] w-[500px] flex-col border-t"
      {...props}
    >
      <TabsList className="w-full">
        {tabsOption.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="data-[state=active]:text-grayScale09 text-grayScale05 w-full cursor-pointer py-[6px]"
          >
            <div className="h-10 flex-col justify-items-center">
              {activeTab === item.value ? item.activeIcon : item.icon}
              {item.label && (
                <p className="mt-[2px] flex h-[14px] items-center text-[10px]">
                  {item.label}
                </p>
              )}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
