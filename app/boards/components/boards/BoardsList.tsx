"use client";
import { Spinner } from "@/components/common/ui/Spinner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useUserId } from "@/hooks/useUserId";
import { useGetBoardsByUserIdQuery } from "@/store/boards/boardsService";
import { BoardCard } from "./BoardCard";

export const BoardsList = () => {
  const userId = useUserId() || "";
  const { data, error, isLoading } = useGetBoardsByUserIdQuery(userId, {
    skip: !userId,
  });

  useErrorHandler(error);
  if (isLoading) return <Spinner />;
  return (
    <div className="flex gap-5 flex-wrap">
      {data
        ?.map((board) => (
          <BoardCard data={board} userId={userId} key={board.id} />
        ))
        .reverse()}
    </div>
  );
};
