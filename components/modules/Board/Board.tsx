"use client";
import { Spinner } from "@/components/common/ui/Spinner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import {
  useGetColumnsByBoardIdQuery,
  useMoveColumnMutation,
} from "@/store/columns/columnsService";
import { useMoveTaskMutation } from "@/store/tasks/tasksService";
import { useParams } from "next/navigation";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import ColumnList from "./ColumnList";

export const Board = () => {
  const { id } = useParams() as { id: string };
  const {
    data: columns = [],
    error,
    isLoading,
  } = useGetColumnsByBoardIdQuery(id);

  const [moveColumn] = useMoveColumnMutation();
  const [moveTask] = useMoveTaskMutation();

  useErrorHandler(error);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;

    if (activeType === "column") {
      const newIndex = columns.findIndex((col) => col.id === over.id);
      await moveColumn({ id: active.id.toString(), position: newIndex + 1 });
    }

    if (activeType === "task") {
      const toColumn = over.data.current?.columnId;
      const newIndex = over.data.current?.index;
      await moveTask({
        id: active.id.toString(),
        position: (typeof newIndex === "number" ? newIndex : 0) + 1,
        column_id: toColumn,
      });
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex overflow-x-auto h-full p-4 gap-4">
        <ColumnList boardId={id} columns={columns} />
      </div>
    </DndContext>
  );
};
