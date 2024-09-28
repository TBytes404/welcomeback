"use server";

import { register } from "@/util/auth";
import { FormState, SignInFormSchema } from "@/lib/zod";

export async function signup(
  state: FormState,
  data: FormData,
): Promise<FormState> {
  const validatedFields = await SignInFormSchema.safeParseAsync({
    nickname: data.get("nickname"),
    password: data.get("password"),
  });
  if (!validatedFields.success)
    return { errors: validatedFields.error.flatten().fieldErrors };

  const { nickname, password } = validatedFields.data;
  return (await register(nickname, password))
    ? { message: `Signed up as ${nickname}` }
    : { errors: { nickname: [`Be unique, ${nickname} is already taken`] } };
}
