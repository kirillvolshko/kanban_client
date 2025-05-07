"use client";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IColumnResponse } from "@/types/column";
import { useGetTasksByColumnQuery } from "@/store/tasks/tasksService";
import SortableTaskCard from "./SortableTaskCard";
import TaskCard from "./TaskCard";
import { PopoverWindow } from "@/components/common/ui/PopoverWindow";
import { ActionButton } from "@/components/common/ui/ActionButton";
import { Plus, X } from "lucide-react";
import AddTaskForm from "./forms/AddTaskForm";
import { useDeleteColumnMutation } from "@/store/columns/columnsService";

interface Props {
  column: IColumnResponse;
}

const Column = ({ column }: Props) => {
  const { data: tasks = [] } = useGetTasksByColumnQuery(column.id);
  const [deleteColumn] = useDeleteColumnMutation();
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: column.id });
  const handleDelete = async (id: string) => {
    await deleteColumn(id);
  };
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: { type: "column" },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-gray-100 rounded w-72 min-w-[280px] p-3 flex flex-col shadow-md "
    >
      <div className="flex justify-between group">
        <h2 className="font-semibold mb-3">{column.title}</h2>
        <X
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => handleDelete(column.id)}
          className="text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div
        ref={setDropRef}
        className={`transition-all flex flex-col gap-2  ${
          isOver ? "bg-blue-100 rounded p-2" : ""
        }`}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {[...tasks]
            .sort((a, b) => a.position - b.position)
            .map((task, index) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                columnId={column.id}
                index={index}
              >
                <TaskCard task={task} />
              </SortableTaskCard>
            ))}
        </SortableContext>

        {isOver && (
          <div className="w-full h-16 border-dashed border-2 border-blue-400 rounded-md flex items-center justify-center text-sm text-blue-500">
            Drop here
          </div>
        )}
        <div className="mt-4 w-full" onPointerDown={(e) => e.stopPropagation()}>
          <PopoverWindow
            triggerComponent={
              <ActionButton icon={<Plus />} title="Create task" />
            }
            content={
              <AddTaskForm column_id={column.id} position={tasks.length} />
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Column;
