"use client";
import InputField from "@/components/common/fields/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { z } from "zod";
import { AddUserSchema } from "./form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useAddBoardToUserMutation } from "@/store/boards/boardsService";
import { useParams } from "next/navigation";

type FormValues = z.infer<typeof AddUserSchema>;
export const AddUserToProject = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      email: "",
    },
  });
  const { id: boardId } = useParams() as { id: string };
  const [addUser, { error }] = useAddBoardToUserMutation();
  useErrorHandler(error);
  const handleOnSubmit = async (data: FormValues) => {
    const { email } = data;
    await addUser({
      email: email,
      board_id: boardId,
    }).unwrap();
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex gap-2 items-end"
      >
        <InputField
          control={form.control}
          label="User email"
          placeholder="Input user email"
          name="email"
        />

        <Button type="submit">
          <Plus /> Add user
        </Button>
      </form>
    </Form>
  );
};
