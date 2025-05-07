"use client";
import { Spinner } from "@/components/common/ui/Spinner";
import { setOwnerId } from "@/store/boards/boardSlice";
import {
  useDeleteBoardMutation,
  useGetUsersByBoardIdQuery,
} from "@/store/boards/boardsService";
import { useGetColumnsByBoardIdQuery } from "@/store/columns/columnsService";
import { IBoardResponse } from "@/types/board";
import { dateTransaltion } from "@/utils/dateTranslation";
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
  const { data: columns, isLoading } = useGetColumnsByBoardIdQuery(data.id, {
    skip: !data.id,
  });
  const { data: users } = useGetUsersByBoardIdQuery(data.id, {
    skip: !data.id,
  });
  const handleOnRedirect = (id: string) => {
    dispatch(setOwnerId(data.owner_id));
    router.push(`/board/${id}`);
  };
  if (isLoading) return <Spinner />;
  return (
    <div
      className="relative p-[30px] rounded-md bg-secondary hover:cursor-pointer text-md font-semibold"
      onClick={() => handleOnRedirect(data.id)}
    >
      <p className="text-[20px]">{data.title}</p>
      <p>Created date: {dateTransaltion(data.created_at)}</p>
      <p>Columns: {columns?.length}</p>
      <p>Users on board:</p>
      <div className="flex relative">
        {users?.slice(0, 4).map((item, index) => (
          <div
            className="bg-primary text-white rounded-full w-[30px] h-[30px] flex items-center justify-center text-sm border border-white"
            key={item.id}
            title={item.name}
            style={{
              marginLeft: index === 0 ? 0 : -10,
              zIndex: users.length - index,
            }}
          >
            {item.name[0]}
          </div>
        ))}

        {users && users?.length > 4 && (
          <div
            className="bg-gray-400 text-white rounded-full w-[30px] h-[30px] flex items-center justify-center text-sm"
            title={`${users.length - 4} more`}
            style={{ marginTop: -10 }}
          >
            +{users.length - 4}
          </div>
        )}
      </div>

      {data.owner_id === userId && (
        <div
          className="absolute top-1 right-0"
          onClick={() => handleOnClick(data.id)}
        >
          <X size={16} className="text-red-600 hover:cursor-pointer" />
        </div>
      )}
    </div>
  );
};
