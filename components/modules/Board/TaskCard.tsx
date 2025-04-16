"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useGetTasksByColumnQuery } from "@/store/tasks/tasksService";

interface Props {
  taskId: string;
  columnId: string;
  index: number;
}

const TaskCard = ({ taskId, columnId, index }: Props) => {
  const { data: tasks = [] } = useGetTasksByColumnQuery(columnId);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: taskId,
      data: {
        type: "task",
        columnId,
        index,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 200ms ease",
  };

  const task = tasks.find((t) => t.id === taskId);
  if (!task) return <div ref={setNodeRef} style={style} />;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded shadow p-3"
    >
      <h3 className="font-medium">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;
