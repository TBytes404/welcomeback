"use client";

import { signup } from "@/actions/auth";
import { FormState } from "@/lib/zod";
import { useFormState } from "react-dom";

export default function SignupForm() {
  const [state, dispatch, pending] = useFormState<FormState, FormData>(
    signup,
    undefined,
  );

  return (
    <form action={dispatch}>
      {state?.message && <p>{state.message}</p>}
      <div>
        <label htmlFor="nickname">Nickname</label>
        <input id="nickname" name="nickname" type="text" />
      </div>
      {state?.errors?.nickname && (
        <div>
          <p>Nickname must:</p>
          <ul>
            {state.errors.nickname.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  );
}
