import { channel } from "node:diagnostics_channel"
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

export const uploadVideo = z.object({
  vedioUrl:z.string(),
  thumbnailUrl:z.string(),
  description:z.string(),
  title:z.string(),
  type:z.enum(["Public","Private","Unlisted"])
})

export const createChannel = z.object({
  channel:z.boolean(),
  channelName:z.string(),
  bannerUrl:z.string(),
  profilePicture:z.string(),
  description:z.string()
})