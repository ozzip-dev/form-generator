import { z } from "zod";

export const uploadProtocolSchema = z.object({
  file: z.instanceof(File, { message: "Plik jest wymagany" }),
});

export type UploadProtocolSchema = z.infer<typeof uploadProtocolSchema>;
