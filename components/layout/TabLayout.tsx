"use client";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { LucideIcon } from "lucide-react";

type TabLayoutProps = {
  data: {
    title: string;
    icon: LucideIcon;
    content: React.ReactNode;
  }[];
};

export const TabLayout = (data: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState(data.data[0].title);
  return (
    <Tabs
      defaultValue={data.data[0].title}
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="bg-white/15 rounded-[4px]">
        {data.data.map((item) => (
          <TabsTrigger value={item.title} key={item.title}>
            <item.icon
              className={`transition-all ${
                activeTab === item.title ? "stroke-primary" : "stroke-white"
              }`}
            />
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.data.map((item) => (
        <TabsContent
          value={item.title}
          key={item.title}
          className=" rounded-[31px] p-[30px] h-full min-h-[calc(100vh-200px)]"
        >
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
