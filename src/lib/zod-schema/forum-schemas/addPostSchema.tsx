import { z } from "zod";

export const addPostSchema = z.object({
  content: z.string().trim().min(1, "Min. 1 znak").max(100, "Max. 100 znaków"),
});

export type AddPostSchema = z.infer<typeof addPostSchema>;
