import z, { email } from "zod"

export const SignupSchema = z.object({
  email:z.email(),
  password:z.string(),
  firstName:z.string(),
  lastName:z.string(),
  gender:z.enum(["Male","Female","Transgender"]),
  dateOfBirth : z.coerce.date()
})

export const SigninSchema = z.object({
  email:z.email(),
  password:z.string()
})