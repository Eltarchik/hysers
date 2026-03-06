import { z } from "zod"

export const apiErrorSchema = z.object({
    message: z.string()
        .or(z.string().array())
        .transform(v => Array.isArray(v) ? v : [v]),
    error: z.string(),
    statusCode: z.number(),
})

export type ApiError = z.infer<typeof apiErrorSchema>

export const isApiError = (error: unknown): error is ApiError => {
    const parsed = apiErrorSchema.safeParse(error)
    return parsed.success
}