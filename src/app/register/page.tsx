'use client'

import { Input } from "@/shared/ui/Input"
import { Text } from "@/shared/ui/Text"
import { Routes } from "@/shared/config/routes"
import { PasswordInput } from "@/entities/auth/PasswordInput"
import { z } from "zod"
import { ChangeEvent, useCallback, useEffect, useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { authAPI } from "@/shared/api/auth"
import { cn } from "@/shared/lib/cn"
import { useOvertimeValue } from "@/shared/hooks/useOvertimeValue"
import { useRouter } from "next/navigation"
import { useForm } from "@/shared/hooks/useForm"
import { Button } from "@/shared/ui/Button"
import { LoginWithDiscordButton } from "@/entities/auth/LoginWithDiscordButton"
import Link from "next/link"
import { Heading } from "@/shared/ui/Heading"
import { isApiError } from "@/shared/api/responseSchemas"
import { ArrowLeft } from "lucide-react"

const formDataShema = z.object({
    name: z.string().min(3, "The name must contain at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "The password must contain at least 6 characters"),
})

type FormData = z.infer<typeof formDataShema>

const initialFormData: FormData = {
    name: "",
    email: "",
    password: "",
}

export default function Register() {
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            return await authAPI.register(formData)
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

    const onFieldChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
            setFormError(undefined)
            setField[field](event.target.value)
            hideFieldError[field]()
            lastChangedField.current = field
        }, []
    )

    useEffect(() => {
        if (!lastChangedField.current) return
        const timeout = setTimeout(validateField[lastChangedField.current], 600)
        lastChangedField.current = undefined

        return () => clearTimeout(timeout)
    }, [formData])

    return <div className="flex flex-1 justify-center items-center w-full">
        <div className="flex items-center flex-col gap-5 p-5 w-120 rounded-2xl bg-island">
            <div className="grid grid-cols-[40px_1fr_40px] items-center w-full">
                <Link href={Routes.HOME} className="flex justify-center items-center size-8 group">
                    <ArrowLeft className="text-element-sub group-hover:text-element-imp transition-colors duration-80 ease-in" />
                </Link>
                <Heading className="mx-auto">Register</Heading>
            </div>
            <form className="flex flex-col gap-5 w-full"
                  onSubmit={submit}
            >
                <Input className="bg-glade"
                       placeholder="Name"
                       errorMsg={formData.name.length ? fieldErrors?.name : undefined}
                       onChange={e => onFieldChange(e, "name")}
                       onBlur={validateField.name}
                />
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
                        { isPending ? "Loading..." : "Register" }
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
                <Text small className="text-element-sub">Уже есть аккаунт?</Text>
                <Link href={Routes.LOGIN}>
                    <Text small className="text-accent-element">Войди</Text>
                </Link>
            </span>
        </div>
    </div>
}