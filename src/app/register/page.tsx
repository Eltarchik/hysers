'use client'

import { Input } from "@/shared/ui/Input"
import { Text } from "@/shared/ui/Text"
import { Routes } from "@/shared/config/routes"
import { PasswordInput } from "@/entities/auth/PasswordInput"
import { z } from "zod"
import { ChangeEvent, useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { AuthAPI } from "@/shared/api/auth"
import { cn } from "@/shared/lib/cn"
import { useOvertimeValue } from "@/shared/hooks/useOvertimeValue"
import { useRouter } from "next/navigation"
import { useForm } from "@/shared/hooks/useForm"
import { Heading } from "lucide-react"
import { Button } from "@/shared/ui/Button"
import { LoginWithDiscordButton } from "@/entities/auth/LoginWithDiscordButton"
import Link from "next/link"

const FormDataShema = z.object({
    name: z.string().min(3, "The name must contain at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "The password must contain at least 6 characters"),
})

type FormData = z.infer<typeof FormDataShema>

const initialFormData: FormData = {
    name: "",
    email: "",
    password: "",
}

export default function Register() {
    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: async () => {
            return await AuthAPI.register(formData)
        },
        onError: async (error) => {
            setFormError(error.message)
        },
        onSuccess: async () => {
            router.push(Routes.HOME)
        }
    })

    const { formData, submit, setField, fieldErrors, formError, setFormError } = useForm(FormDataShema, initialFormData, (data) => {
        mutate()
    })
    const formOvertimeError = useOvertimeValue(formError)

    const onFieldChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
            setFormError(undefined)
            setField[field](event.target.value)
        }, []
    )

    return <div className="flex justify-center items-center h-full w-full">
        <div className="flex items-center flex-col gap-5 p-5 w-120 rounded-2xl bg-island">
            <Heading>Register</Heading>
            <form className="flex flex-col gap-5 w-full"
                  onSubmit={submit}
            >
                <Input className="bg-glade"
                       placeholder="Name"
                       errorMsg={fieldErrors?.name.length ? fieldErrors?.name : undefined}
                       onChange={e => onFieldChange(e, "name")}
                />
                <Input className="bg-glade"
                       placeholder="Email"
                       errorMsg={fieldErrors?.email.length ? fieldErrors?.email : undefined}
                       onChange={e => onFieldChange(e, "email")}
                />
                <PasswordInput className="bg-glade"
                               placeholder="Password"
                               errorMsg={fieldErrors?.password.length ? fieldErrors?.password : undefined}
                               onChange={e => onFieldChange(e, "password")}
                />
                <Button className="bg-accent-island w-full group"
                        type="submit"
                        disabled={!!fieldErrors || !!formError}
                >
                    <Text className="text-accent-element group-disabled:text-element-dis">Register</Text>
                </Button>
                <Text small className={cn(
                                "text-red-element opacity-0 h-0 -mt-5 overflow-hidden transition-[height,opacity,margin]",
                                formError && "opacity-100 h-5 mt-0"
                             )}
                >
                        { formOvertimeError }
                </Text>
            </form>
            <div className="flex flex-col gap-1 w-full">
                <Text small className="text-element-sub text-center">OR</Text>
                <LoginWithDiscordButton />
            </div>
            <span className="flex gap-1">
                <Text small className="text-element-sub">Уже есть аккаунт?</Text>
                <Link href={Routes.LOGIN}>
                    <Text small className="text-accent-element">Войди</Text>
                </Link>
            </span>
        </div>
    </div>
}