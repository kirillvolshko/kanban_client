import { z } from "zod";

const RegistratinSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});
export default RegistratinSchema;
