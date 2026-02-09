import { TopicCategory } from "@/enums/forum";
import { z } from "zod";

export const createTopicSchema = z.object({
  title: z.string().trim().min(3, "Min. 3 znaki").max(50, "Max. 50 znaków"),
  description: z
    .string()
    .trim()
    .min(3, "Min. 3 znaki")
    .max(500, "Max. 500 znaków")
    .optional(),
  category: z.enum(Object.values(TopicCategory) as [string, ...string[]]),
});

export type CreateTopicSchema = z.infer<typeof createTopicSchema>;
