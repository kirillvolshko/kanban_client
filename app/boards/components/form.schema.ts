import { z } from "zod";

const CreateFormSchema = z.object({
  title: z.string(),
});
export default CreateFormSchema;
