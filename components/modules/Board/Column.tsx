"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IColumnResponse } from "@/types/column";
import { useGetTasksByColumnQuery } from "@/store/tasks/tasksService";
import TaskCard from "./TaskCard";

interface Props {
  column: IColumnResponse;
}

const Column = ({ column }: Props) => {
  const { data: tasks = [] } = useGetTasksByColumnQuery(column.id);
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: column.id });

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
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-100 rounded w-72 min-w-[280px] p-3 flex flex-col shadow-md"
    >
      <h2 className="font-semibold mb-3">{column.title}</h2>

      <div
        ref={setDropRef}
        className={`transition-all flex flex-col gap-2 ${
          isOver ? "bg-blue-100 rounded p-2" : ""
        }`}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {[...tasks]
            .sort((a, b) => a.position - b.position)
            .map((task, index) => (
              <TaskCard
                key={task.id}
                taskId={task.id}
                columnId={column.id}
                index={index}
              />
            ))}
        </SortableContext>

        {isOver && (
          <div className="w-full h-16 border-dashed border-2 border-blue-400 rounded-md flex items-center justify-center text-sm text-blue-500">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
