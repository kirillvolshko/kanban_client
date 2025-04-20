"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/fields/InputField";
import { Button } from "@/components/ui/button";
import { useErrorHandler } from "@/hooks/useErrorHandler";

import { CreateTaskSchema } from "./schemas/taskSchema";
import { useCreateTaskMutation } from "@/store/tasks/tasksService";

type FormValues = z.infer<typeof CreateTaskSchema>;
const AddTaskForm = ({
  onClose,
  column_id,
  position,
}: {
  onClose?: (value: boolean) => void;
  column_id: string;
  position: number;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: { title: "" },
  });
  const [create, { error }] = useCreateTaskMutation();
  useErrorHandler(error);
  const handleOnSubmit = async (data: FormValues) => {
    const { title } = data;
    await create({
      title: title,
      column_id: column_id,
      position: position + 1,
    }).unwrap();
    if (onClose) onClose(true);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-5"
        >
          <InputField
            control={form.control}
            name="title"
            label="Title"
            placeholder="Enter task name"
          />

          <Button type="submit">Add task</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTaskForm;
