import { object, string } from "zod";

export const SignInFormSchema = object({
  nickname: string({ required_error: "Be present" })
    .min(1, { message: "Be at least 1 character long." })
    .max(32, { message: "Be at most 32 characters long." })
    .trim(),
  password: string({ required_error: "Be present" })
    .min(4, { message: "Be at least 4 characters long" })
    .max(32, { message: "Be at most 32 characters long." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        nickname?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
