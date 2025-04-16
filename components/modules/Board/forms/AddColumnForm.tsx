"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/fields/InputField";
import { Button } from "@/components/ui/button";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { CreateColumnSchema } from "./schemas/columnSchema";
import { useCreateColumnMutation } from "@/store/columns/columnsService";
import { Spinner } from "@/components/common/ui/Spinner";

type FormValues = z.infer<typeof CreateColumnSchema>;
const AddColumnForm = ({
  onClose,
  boardId,
  position,
}: {
  onClose?: (value: boolean) => void;
  boardId: string;
  position: number;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateColumnSchema),
    defaultValues: { title: "" },
  });
  const [create, { isLoading, error }] = useCreateColumnMutation();
  useErrorHandler(error);
  const handleOnSubmit = async (data: FormValues) => {
    const { title } = data;
    await create({
      title: title,
      board_id: boardId,
      position: position + 1,
    }).unwrap();
    if (onClose) onClose(true);
  };
  if (isLoading) return <Spinner />;
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
            placeholder="Enter column name"
          />

          <Button type="submit">Add column</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddColumnForm;
