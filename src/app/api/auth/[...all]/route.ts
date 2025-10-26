import { auth } from "@/lib/zodSchema/zodAuthSchema/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
