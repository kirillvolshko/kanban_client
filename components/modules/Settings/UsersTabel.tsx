import { TableComponent } from "@/components/common/ui/TableComponent";
import { getUserColumns } from "./columns";
import {
  useDeleteUserFromBoardMutation,
  useGetUsersByBoardIdQuery,
} from "@/store/boards/boardsService";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useParams } from "next/navigation";

export const UserTable = () => {
  const { id: boardId } = useParams() as { id: string };
  const [deleteUser] = useDeleteUserFromBoardMutation();
  const { data, error } = useGetUsersByBoardIdQuery(boardId, {
    skip: !boardId,
  });
  useErrorHandler(error);

  const handleDelete = async (id: string) => {
    await deleteUser({
      user_id: id,
      board_id: boardId,
    }).unwrap();
  };

  const columns = getUserColumns(handleDelete);
  return <TableComponent data={data ?? []} columns={columns} />;
};
