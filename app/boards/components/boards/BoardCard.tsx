"use client";
import { useDeleteBoardMutation } from "@/store/boards/boardsService";
import { IBoardResponse } from "@/types/board";
import { X } from "lucide-react";
import Link from "next/link";

type BoardCardProps = {
  data: IBoardResponse;
  userId: string;
};
export const BoardCard = ({ data, userId }: BoardCardProps) => {
  const [deleteBoard] = useDeleteBoardMutation();

  const handleOnClick = async (id: string) => {
    await deleteBoard(id).unwrap();
  };

  return (
    <Link href={`/board/${data.id}`}>
      <div className="relative px-8 py-4 rounded-md bg-secondary hover:cursor-pointer text-md font-semibold">
        {data.title}
        {data.owner_id === userId && (
          <div
            className="absolute top-1 right-0"
            onClick={() => handleOnClick(data.id)}
          >
            <X size={14} className="text-red-600 hover:cursor-pointer" />
          </div>
        )}
      </div>
    </Link>
  );
};
