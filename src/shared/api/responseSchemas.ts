import { z } from "zod"

export const errorResponseSchema = z.object({
    status: z.literal("error"),
    message: z.string(),
    code: z.number(),
})

export const validationErrorResponseSchema = z.object({
    status: z.literal("validation_error"),
    errors: z.record(z.string(), z.string().array()),
})

export const badResponseSchema = z.discriminatedUnion("status", [
    errorResponseSchema,
    validationErrorResponseSchema,
])
export type BadResponse = z.infer<typeof badResponseSchema>

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.discriminatedUnion("status", [
        z.object({
            status: z.literal("success"),
            data: dataSchema,
        }),
        errorResponseSchema,
        validationErrorResponseSchema,
    ])

export const isApiError = (error: unknown): error is BadResponse => {
    const parsed = badResponseSchema.safeParse(error)
    return parsed.success
}

export const errorHandler = (error: any) => {
    const parsed = badResponseSchema.safeParse(error.response?.data)
    if (parsed.success) return parsed.data
}