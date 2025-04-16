"use client";

import { Board } from "@/components/modules/Board/Board";
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
    content: <p>data</p>,
  },
];
