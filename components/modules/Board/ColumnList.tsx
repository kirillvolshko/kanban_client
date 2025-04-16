"use client";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IColumnResponse } from "@/types/column";
import Column from "./Column";
import { PopoverWindow } from "@/components/common/ui/PopoverWindow";
import { ActionButton } from "@/components/common/ui/ActionButton";
import { Plus } from "lucide-react";
import AddColumnForm from "./forms/AddColumnForm";
import { useMemo } from "react";

interface Props {
  boardId: string;
  columns: IColumnResponse[];
}

const ColumnList = ({ boardId, columns }: Props) => {
  const items = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <SortableContext items={items} strategy={horizontalListSortingStrategy}>
      <div className="flex gap-4">
        {[...columns]
          .sort((a, b) => a.position - b.position)
          .map((col) => (
            <Column key={col.id} column={col} />
          ))}
        <div className="h-full p-4">
          <PopoverWindow
            triggerComponent={
              <ActionButton icon={<Plus />} title="Add new column" />
            }
            content={
              <AddColumnForm boardId={boardId} position={columns.length} />
            }
          />
        </div>
      </div>
    </SortableContext>
  );
};

export default ColumnList;
