"use client";

import { Board } from "@/components/modules/Board/Board";
import { SettigsTab } from "@/components/modules/Settings/Settings";
import { UserRoundSearch, Building } from "lucide-react";

export const TabsConfig = [
  {
    title: "Board",
    icon: UserRoundSearch,
    content: <Board />,
  },
  {
    title: "Settings",
    icon: Building,
    content: <SettigsTab />,
  },
];
