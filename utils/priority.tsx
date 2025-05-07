import { ChevronsDown, ChevronsUp, Equal } from "lucide-react";

export const getPriority = (priority: "low" | "medium" | "high") => {
  const variants = {
    low: <ChevronsDown size={20} className="text-green-600" />,
    medium: <Equal size={20} className=" text-blue-500" />,
    high: <ChevronsUp size={20} className=" text-red-500" />,
  };
  return variants[priority];
};
