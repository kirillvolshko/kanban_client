import { IBoardResponse } from "@/types/board";

type BoardCardProps = {
  data: IBoardResponse;
  userId: string;
};
export const BoardCard = ({ data, userId }: BoardCardProps) => {
  return (
    <div className="px-8 py-4 rounded-md bg-secondary hover:cursor-pointer text-md font-semibold">
      {data.title}
    </div>
  );
};
