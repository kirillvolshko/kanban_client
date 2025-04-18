"use client";
import { DialogWindow } from "@/components/common/ui/DialogWindow";
import { ITask } from "@/types/task";
import { ArrowUpRight } from "lucide-react";
import EditTaskForm from "./forms/EditTaskForm";

interface Props {
  task: ITask;
}

const TaskCard = ({ task }: Props) => {
  return (
    <div className="bg-white rounded shadow p-3">
      <div className="relative" onPointerDown={(e) => e.stopPropagation()}>
        <DialogWindow
          triggerComponent={<ArrowUpRight size={14} />}
          classNameTrigger="relative top-0 left-55 hover:cursor-pointer"
          content={<EditTaskForm task={task} />}
        />
      </div>

      <h3 className="font-medium">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;
