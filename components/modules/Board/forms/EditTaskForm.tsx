"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/fields/InputField";
import SelectField from "@/components/common/fields/SelectField";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common/ui/Spinner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useGetUsersByBoardIdQuery } from "@/store/boards/boardsService";
import { useGetColumnsByBoardIdQuery } from "@/store/columns/columnsService";
import { useUpdateTaskMutation } from "@/store/tasks/tasksService";
import { RawTaskUpdateSchema, TaskUpdateSchema } from "./schemas/taskSchema";
import TextareaField from "@/components/common/fields/TextAreaField";
import { useParams } from "next/navigation";

type FormValues = z.infer<typeof RawTaskUpdateSchema>;

interface Props {
  onClose?: (success: boolean) => void;

  task: {
    id: string;
    title: string;
    description?: string;
    priority?: string;
    assigned_to?: string;
    column_id: string;

    start_date?: string;
    end_date?: string;
  };
}

const EditTaskForm = ({ task, onClose }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(TaskUpdateSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      priority: task.priority || "",
      assigned_to: task.assigned_to || "",
      column_id: task.column_id,
      start_date: task.start_date ? new Date(task.start_date) : undefined,
      end_date: task.end_date ? new Date(task.end_date) : undefined,
    },
  });
  const { id: boardId } = useParams() as { id: string };
  const [updateTask, { isLoading, error }] = useUpdateTaskMutation();
  useErrorHandler(error);

  const { data: users = [], isLoading: usersLoading } =
    useGetUsersByBoardIdQuery(boardId);
  const { data: columns = [], isLoading: columnsLoading } =
    useGetColumnsByBoardIdQuery(boardId);

  const priorities = ["low", "medium", "high"].map((p) => ({
    label: p,
    value: p,
  }));

  const handleSubmit = async (data: FormValues) => {
    await updateTask({
      id: task.id,
      data: {
        title: data.title,
        description: data.description || undefined,
        start_date: data.start_date
          ? new Date(data.start_date).toISOString()
          : undefined,
        end_date: data.end_date
          ? new Date(data.end_date).toISOString()
          : undefined,
        priority: data.priority || undefined,
        assigned_to: data.assigned_to || undefined,
        column_id: data.column_id || undefined,
      },
    }).unwrap();
    if (onClose) onClose(true);
  };

  if (isLoading) return <Spinner />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <InputField
          control={form.control}
          name="title"
          label="Title"
          placeholder="Enter task title"
        />

        <TextareaField
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter task description"
        />

        <SelectField
          control={form.control}
          name="assigned_to"
          label="Assignee"
          placeholder="Select user"
          options={users.map((user) => ({ label: user.name, value: user.id }))}
          error={usersLoading ? "Loading..." : undefined}
        />

        <SelectField
          control={form.control}
          name="priority"
          label="Priority"
          placeholder="Select priority"
          options={priorities}
        />

        <SelectField
          control={form.control}
          name="column_id"
          label="Column"
          placeholder="Move to column"
          options={columns.map((col) => ({ label: col.title, value: col.id }))}
          error={columnsLoading ? "Loading..." : undefined}
        />
        <InputField
          control={form.control}
          name="start_date"
          label="Start Date"
          type="date"
        />
        <InputField
          control={form.control}
          name="end_date"
          label="End Date"
          type="date"
        />

        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
};

export default EditTaskForm;
