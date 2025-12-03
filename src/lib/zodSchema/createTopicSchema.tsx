import { TopicCategory } from "@/enums/forum";
import { z } from "zod";

export const createTopicSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Min. 5 znaki")
    .max(50, "Max. 50 znaków"),
  description: z
    .string()
    .trim()
    .min(5, "Min. 5 znaki")
    .max(50, "Max. 50 znaków")
    .optional(),
  category: z
    .enum(Object.values(TopicCategory) as [string, ...string[]])
});

export type CreateTopicSchema = z.infer<typeof createTopicSchema>;
