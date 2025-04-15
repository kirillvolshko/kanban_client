import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ActionButtonProps = {
  icon: ReactNode;
  title: string;
  className?: string;
};

export const ActionButton = ({ icon, title, className }: ActionButtonProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-md cursor-pointer",
        className
      )}
    >
      <div>{icon}</div>
      <span className={className?.includes("icon-only") ? "hidden" : ""}>
        {title}
      </span>
    </span>
  );
};
