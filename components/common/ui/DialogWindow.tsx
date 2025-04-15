"use client";
import React, { useState, useEffect, ReactElement } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface DialogWindowProps {
  triggerComponent?: ReactElement<{ onClick?: () => void }>;
  content?: ReactElement<{ onClose?: () => void }>;
  fullView?: boolean;
  className?: string;
  classNameTrigger?: string;
  hideCloseButton?: boolean;
}

export const DialogWindow = ({
  content,
  fullView,
  triggerComponent,
  className,
  classNameTrigger,
}: DialogWindowProps) => {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component only renders on the client side
  }, []);

  if (!isClient) return null; // Render nothing on the server side

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={cn(classNameTrigger)}
        >
          {triggerComponent}
        </div>
      </DialogTrigger>

      <DialogTitle className="invisible"></DialogTitle>
      <DialogDescription className="invisible"></DialogDescription>
      <DialogClose asChild />

      <DialogContent
        className={cn(
          "bg-primarySecondary fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-[20px] md:p-[30px] overflow-y-auto max-h-[80vh]",
          fullView && "p-0 border-none",
          className
        )}
      >
        {content &&
          React.cloneElement(content, {
            onClose: () => setOpen(false),
          })}
      </DialogContent>
    </Dialog>
  );
};
