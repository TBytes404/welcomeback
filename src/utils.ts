import { hash } from "bcrypt";
const saltRounds = 11;
export function saltHashPassword(pw: string) {
  return hash(pw, saltRounds);
}
