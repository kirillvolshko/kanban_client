import { TableComponent } from "@/components/common/ui/TableComponent";
import { getUserColumns } from "./columns";
import {
  useDeleteUserFromBoardMutation,
  useGetUsersByBoardIdQuery,
} from "@/store/boards/boardsService";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useUserId } from "@/hooks/useUserId";

export const UserTable = () => {
  const { id: boardId } = useParams() as { id: string };
  const { owner_id } = useSelector((state: RootState) => state.board);
  const userId = useUserId();
  const isOwner = owner_id === userId;
  const [deleteUser] = useDeleteUserFromBoardMutation();
  const { data, error } = useGetUsersByBoardIdQuery(boardId, {
    skip: !boardId,
  });
  const users = useMemo(() => {
    return data?.filter((item) => item.id !== owner_id);
  }, [data, owner_id]);

  useErrorHandler(error);

  const handleDelete = async (id: string) => {
    await deleteUser({
      user_id: id,
      board_id: boardId,
    }).unwrap();
  };

  const columns = getUserColumns(handleDelete, isOwner);
  return <TableComponent data={users ?? []} columns={columns} />;
};
