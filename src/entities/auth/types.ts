import z from "zod"

export const registerDTOSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
})

export type RegisterDTO = z.infer<typeof registerDTOSchema>

export type LoginDTO = Pick<RegisterDTO, "email" | "password">