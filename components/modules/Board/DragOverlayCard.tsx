"use client";
import { ITask } from "@/types/task";

interface Props {
  task: ITask;
}

const DragOverlayCard = ({ task }: Props) => {
  return (
    <div
      className="bg-white rounded shadow p-3 pointer-events-none opacity-90"
      style={{ width: "240px" }}
    >
      <h3 className="font-medium">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
    </div>
  );
};

export default DragOverlayCard;
