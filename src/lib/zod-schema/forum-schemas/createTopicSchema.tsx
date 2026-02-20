import { TopicCategory } from "@/enums/forum";
import { z } from "zod";

export const createTopicSchema = z.object({
  title: z.string().trim().min(3, "Min. 3 znaki").max(50, "Max. 50 znaków"),
  description: z
    .string()
    .trim()
    .min(3, "Min. 3 znaki")
    .max(500, "Max. 500 znaków"),
  category: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.enum(Object.values(TopicCategory) as [string, ...string[]], {
      required_error: "Kategoria wymagana",
    }),
  ),
});

export type CreateTopicSchema = z.infer<typeof createTopicSchema>;
