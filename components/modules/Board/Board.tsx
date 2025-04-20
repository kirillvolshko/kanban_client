"use client";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/common/ui/Spinner";
import {
  useGetColumnsByBoardIdQuery,
  useMoveColumnMutation,
} from "@/store/columns/columnsService";
import { useMoveTaskMutation } from "@/store/tasks/tasksService";
import { ITask } from "@/types/task";
import ColumnList from "./ColumnList";
import DragOverlayCard from "./DragOverlayCard";

export const Board = () => {
  const { id: boardId } = useParams() as { id: string };

  const { data: columns = [], isLoading } =
    useGetColumnsByBoardIdQuery(boardId);
  const [moveColumn] = useMoveColumnMutation();
  const [moveTask] = useMoveTaskMutation();

  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = ({ active }: DragStartEvent) => {
    const type = active.data.current?.type;
    if (type === "task" && active.data.current?.task) {
      setActiveTask(active.data.current.task);
    }
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;

    if (activeType === "column") {
      const newIndex = columns.findIndex((col) => col.id === over.id);
      if (newIndex === -1) return;
      await moveColumn({ id: active.id.toString(), position: newIndex + 1 });
    }

    if (activeType === "task") {
      const taskId = active.id.toString();
      const fromColumn = active.data.current?.columnId;
      let toColumn = over.data.current?.columnId;
      let newIndex = over.data.current?.index;

      if (!toColumn && over.id) {
        toColumn = over.id.toString();
        newIndex = 0;
      }

      if (!fromColumn || !toColumn || typeof newIndex !== "number") return;

      await moveTask({
        id: taskId,
        position: newIndex + 1,
        column_id: toColumn,
      });
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto p-4 min-h-[calc(100vh-270px)]">
        <ColumnList boardId={boardId} columns={columns} />
      </div>
      <DragOverlay>
        {activeTask ? <DragOverlayCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
