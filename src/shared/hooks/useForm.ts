import { z } from "zod"
import { SubmitEventHandler, useState, type SubmitEvent } from "react"

export const useForm = <Schema extends z.ZodObject>(
    schema: Schema,
    initialFormData: z.infer<Schema>,
    onSubmit: (data: z.infer<Schema>, event: SubmitEvent<HTMLElement>) => void,
) => {
    type FormData = z.infer<Schema>

    const [ localFormData, setLocalFormData ] = useState<Partial<FormData>>({})
    const [ showErrors, setShowErrors ] = useState(false)
    const [ formError, setFormError ] = useState<string>()

    const formData: FormData = { ...initialFormData, ...localFormData }

    const validate = () => {
        const res = schema.safeParse(formData)
        if (res.success) return

        return Object.fromEntries(
            res.error.issues.map(e => ([e.path[0], e.message]))
        ) as Record<keyof FormData, string>
    }

    const fieldErrors = showErrors ? validate() : undefined

    const submit: SubmitEventHandler<HTMLElement> = (event) => {
        event.preventDefault()

        const errors = validate()

        if (errors) {
            setShowErrors(true)
            return
        }

        onSubmit(formData, event)
    }

    const setField = Object.fromEntries(
        Object.keys(schema.shape).map(key => [key, (value: unknown) => {
            setLocalFormData(prev => ({ ...prev, [key]: value }))
        }])
    ) as Record<keyof FormData, (value: unknown) => void>

    return {
        formData,
        fieldErrors,
        formError,
        setFormError,
        setField,
        setLocalFormData,
        submit,
    }
}