import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string(),
});
// export const CreateTaskSchema = z.object({
//   title: z.string(),
//   column_id: z.string(),
//   description: z.string(),
//   start_date: z.string(),
//   end_date: z.string(),
//   priority: z.string(),
//   assigned_to: z.string(),
// });
