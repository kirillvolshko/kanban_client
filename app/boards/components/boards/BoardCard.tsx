"use client";
import { setOwnerId } from "@/store/boards/boardSlice";
import { useDeleteBoardMutation } from "@/store/boards/boardsService";
import { IBoardResponse } from "@/types/board";
import { X } from "lucide-react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
type BoardCardProps = {
  data: IBoardResponse;
  userId: string;
};

export const BoardCard = ({ data, userId }: BoardCardProps) => {
  const [deleteBoard] = useDeleteBoardMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnClick = async (id: string) => {
    await deleteBoard(id).unwrap();
  };

  const handleOnRedirect = (id: string) => {
    dispatch(setOwnerId(data.owner_id));
    router.push(`/board/${id}`);
  };

  return (
    <div
      className="relative px-8 py-4 rounded-md bg-secondary hover:cursor-pointer text-md font-semibold"
      onClick={() => handleOnRedirect(data.id)}
    >
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
  );
};
