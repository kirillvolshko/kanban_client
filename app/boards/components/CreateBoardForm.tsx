"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/common/fields/InputField";
import { Button } from "@/components/ui/button";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import CreateFormSchema from "./form.schema";
import { useCreateBoardMutation } from "@/store/boards/boardsService";
import { useUserId } from "@/hooks/useUserId";

type FormValues = z.infer<typeof CreateFormSchema>;
const CreateBoardForm = ({
  onClose,
}: {
  onClose?: (value: boolean) => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: { title: "" },
  });
  const [create, { error }] = useCreateBoardMutation();
  const userId = useUserId();
  useErrorHandler(error);
  const handleOnSubmit = async (data: FormValues) => {
    await create({
      title: data.title,
      owner_id: userId || "",
    }).unwrap();
    if (onClose) onClose(true);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        <InputField
          control={form.control}
          name="title"
          label="Title"
          placeholder="Enter board name"
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default CreateBoardForm;
