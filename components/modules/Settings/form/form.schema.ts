import { z } from "zod";

export const AddUserSchema = z.object({
  email: z.string().email("Incorrect email"),
});
