"use client";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IColumnResponse } from "@/types/column";
import Column from "./Column";
import { useMemo } from "react";
import { PopoverWindow } from "@/components/common/ui/PopoverWindow";
import { ActionButton } from "@/components/common/ui/ActionButton";
import { Plus } from "lucide-react";
import AddColumnForm from "./forms/AddColumnForm";

interface Props {
  boardId: string;
  columns: IColumnResponse[];
}

const ColumnList = ({ boardId, columns }: Props) => {
  const sorted = useMemo(
    () => [...columns].sort((a, b) => a.position - b.position),
    [columns]
  );

  return (
    <SortableContext
      items={sorted.map((col) => col.id)}
      strategy={horizontalListSortingStrategy}
    >
      {sorted.map((col) => (
        <Column key={col.id} column={col} />
      ))}
      <div className="h-full min-w-[250px] p-4">
        <PopoverWindow
          triggerComponent={
            <ActionButton icon={<Plus />} title="Add new column" />
          }
          content={
            <AddColumnForm boardId={boardId} position={columns.length} />
          }
        />
      </div>
    </SortableContext>
  );
};

export default ColumnList;
