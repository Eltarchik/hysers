import { z } from "zod"

export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    avatar: z.string().nullable(),
})

export type User = z.infer<typeof userSchema>
