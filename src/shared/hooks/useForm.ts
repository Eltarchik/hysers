import { z } from "zod"
import { SubmitEventHandler, useState, type SubmitEvent } from "react"

export const useForm = <Schema extends z.ZodObject>(
    schema: Schema,
    initialFormData: z.infer<Schema>,
    onSubmit: (data: z.infer<Schema>, event: SubmitEvent<HTMLElement>) => void,
) => {
    type FormData = z.infer<Schema>
    type FormField = keyof FormData
    type FieldErrors = Record<FormField, string>

    const [ localFormData, setLocalFormData ] = useState<Partial<FormData>>({})
    const [ formError, setFormError ] = useState<string>()

    const formData: FormData = { ...initialFormData, ...localFormData }

    const getErrors = (): FieldErrors | undefined => {
        const res = schema.safeParse(formData)
        if (res.success) return

        return Object.fromEntries(
            res.error.issues.map(e => ([e.path[0], e.message]))
        ) as Record<FormField, string>
    }

    const [ fieldErrors, setFieldErrors ] = useState<Record<FormField, string>>(
        {} as FieldErrors
    )
    const isValid = !getErrors()

    const submit: SubmitEventHandler<HTMLElement> = (event) => {
        event.preventDefault()

        if (!getErrors()) onSubmit(formData, event)
    }

    const setField = Object.fromEntries(
        Object.keys(schema.shape).map(key => [key, (value: unknown) => {
            setLocalFormData(prev => ({
                ...prev, [key]: value
            }))
        }])
    ) as Record<FormField, (value: unknown) => void>

    const validateForm = () => {
        setFieldErrors(getErrors() || {} as FieldErrors)
    }

    const validateField = Object.fromEntries(
        Object.keys(schema.shape).map(key => [key, () => {
            setFieldErrors(prev => {
                const error = getErrors()?.[key]
                const errors = Object
                    .entries(prev)
                    .filter(ent => ent[1] && ent[0] !== key)

                return Object.fromEntries([
                    ...errors,
                    error ? [key, error] : []
                ])
            })
        }])
    ) as Record<FormField, () => void>

    const hideFieldError = Object.fromEntries(
        Object.keys(schema.shape).map(key => [key, () => {
            setFieldErrors(prev => ({
               ...prev, [key]: undefined
            }))
        }])
    ) as Record<FormField, () => void>

    return {
        formData,
        fieldErrors,
        formError,
        setFormError,
        isValid,
        validateForm,
        validateField,
        hideFieldError,
        setField,
        setLocalFormData,
        submit,
    }
}