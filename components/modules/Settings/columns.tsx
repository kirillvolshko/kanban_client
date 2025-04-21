import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type User = {
  id: string;
  name: string;
  email: string;
};

export const getUserColumns = (
  onDelete: (id: string) => void,
  isOwner: boolean
): ColumnDef<User>[] => {
  const columns: ColumnDef<User>[] = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
  ];

  if (isOwner) {
    columns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      ),
    });
  }

  return columns;
};
