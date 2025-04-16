import { z } from "zod";

export const CreateColumnSchema = z.object({
  title: z.string(),
});
