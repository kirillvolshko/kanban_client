import { ReactNode } from "react";

type NoDataMessage = {
  icon: ReactNode;
  title: string;
  className?: string;
};
export const NoDataMessage = ({ icon, title, className }: NoDataMessage) => {
  return (
    <div className={className}>
      <p className="flex gap-2 items-center">
        {icon}
        {title}
      </p>
    </div>
  );
};
