"use client";
import { ReactElement, useState } from "react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PopoverProps {
  side?: "bottom" | "top" | "right" | "left";
  align?: "end" | "center" | "start";
  sideOffset?: number;
  triggerComponent?: ReactElement<{ onClick?: () => void }>;
  content?: ReactElement<{ onClose?: () => void }>;
  className?: string;
}

export const PopoverWindow = ({
  side = "bottom",
  align = "end",
  sideOffset = -6,
  triggerComponent,
  content,

  className,
}: PopoverProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "group flex items-center justify-center hover:text-primary",
          className
        )}
      >
        <div onClick={() => setOpen((prev) => !prev)}>{triggerComponent}</div>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={sideOffset}
        side={side}
        align={align}
        className={cn(
          "mt-4 p-[20px] bg-secondary overflow-auto max-w-screen-sm max-h-screen"
        )}
      >
        {content &&
          React.cloneElement(content, {
            onClose: () => setOpen(false),
          })}
      </PopoverContent>
    </Popover>
  );
};
