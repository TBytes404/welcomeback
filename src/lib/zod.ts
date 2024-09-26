import { object, string } from "zod";

export const signInSchema = object({
  username: string({ required_error: "Username is required" })
    .trim()
    .min(2, "Username must be more than 2 characters")
    .max(32, "Username must be less than 32 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9-_]$/, "Username mustn't contain symbols"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
