import { z } from "zod";

export const addFormFieldSchema = z.object({
  header: z.string().nonempty({ message: "Wymagane" }),
  type: z.string().nonempty({ message: "Wymagane" }),
});

// TODO Krzysztof: konsultowałem z UI agent i napisał mi coś takiego:
// Since this type is inferred from a Zod schema, 
// a common convention is to prefix it with "Schema" or suffix it with "Schema" to indicate it's a schema type.
// Dla typów inferowanych z zod trzymajmy się takich konwencji
export type AddFormFieldSchema = z.infer<typeof addFormFieldSchema>;
