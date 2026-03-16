'use client'

import { Input } from "@/shared/ui/Input"
import { Heading } from "@/shared/ui/Heading"
import { Button } from "@/shared/ui/Button"
import { Text } from "@/shared/ui/Text"
import Link from "next/link"
import { Routes } from "@/shared/config/routes"
import { PasswordInput } from "@/entities/auth/PasswordInput"
import { LoginWithDiscordButton } from "@/entities/auth/LoginWithDiscordButton"
import { useForm } from "@/shared/hooks/useForm"
import { z } from "zod"
import { cn } from "@/shared/lib/cn"
import { useOvertimeValue } from "@/shared/hooks/useOvertimeValue"
import { useMutation } from "@tanstack/react-query"
import { authAPI } from "@/shared/api/auth"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useRef } from "react"
import { isApiError } from "@/shared/api/responseSchemas"

const formDataShema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(1, "Password is required"),
})

type FormData = z.infer<typeof formDataShema>

const initialFormData: FormData = {
    email: "",
    password: "",
}

export default function Login() {
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            return await authAPI.login(formData)
        },
        onError: async (error) => {
            if (!isApiError(error)) return
            if (error.status === "validation_error") setFormError(Object.values(error.errors)[0][0])
            else setFormError(error.message)
        },
        onSuccess: async () => {
            router.push(Routes.HOME)
        }
    })

    const {
        formData,
        submit,
        setField,
        isValid,
        validateField,
        hideFieldError,
        fieldErrors,
        formError,
        setFormError,

    } = useForm(formDataShema, initialFormData, () => {
        mutate()
    })
    const formOvertimeError = useOvertimeValue(formError)

    const lastChangedField = useRef<keyof FormData | undefined>(undefined)

    const onFieldChange = (event: ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
        setFormError(undefined)
        setField[field](event.target.value)
        hideFieldError[field]()
        lastChangedField.current = field
    }

    useEffect(() => {
        if (!lastChangedField.current) return
        const timeout = setTimeout(validateField[lastChangedField.current], 600)
        lastChangedField.current = undefined

        return () => clearTimeout(timeout)
    }, [formData])

    return <div className="flex justify-center items-center h-full w-full">
        <div className="flex items-center flex-col gap-5 p-5 w-120 rounded-2xl bg-island">
            <Heading>Login</Heading>
            <form className="flex flex-col gap-5 w-full"
                  onSubmit={submit}
            >
                <Input className="bg-glade"
                       placeholder="Email"
                       errorMsg={formData.email.length ? fieldErrors?.email : undefined}
                       onChange={e => onFieldChange(e, "email")}
                       onBlur={validateField.email}
                />
                <PasswordInput className="bg-glade"
                               placeholder="Password"
                               errorMsg={formData.password.length ? fieldErrors?.password : undefined}
                               onChange={e => onFieldChange(e, "password")}
                               onBlur={validateField.password}
                />
                <Button className="bg-accent-island w-full group"
                        type="submit"
                        disabled={!isValid}
                >
                    <Text className="text-accent-element group-disabled:text-element-dis">
                        {/* todo add Loader component */}
                        { isPending ? "Loading..." : "Login" }
                    </Text>
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
                <Text small className="text-element-sub">Нет аккаунта?</Text>
                <Link href={Routes.REGISTER}>
                    <Text small className="text-accent-element">Зарегистрируйся</Text>
                </Link>
            </span>
        </div>
    </div>
}