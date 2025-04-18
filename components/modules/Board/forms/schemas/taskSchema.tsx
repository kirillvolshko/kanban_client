import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string(),
});

export const RawTaskUpdateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.string().optional(),
  assigned_to: z.string().optional(),
  column_id: z.string(),
  start_date: z.union([z.string(), z.date()]).optional(),
  end_date: z.union([z.string(), z.date()]).optional(),
});
export const TaskUpdateSchema = RawTaskUpdateSchema.transform((data) => ({
  ...data,
  start_date: data.start_date ? new Date(data.start_date) : undefined,
  end_date: data.end_date ? new Date(data.end_date) : undefined,
}));
