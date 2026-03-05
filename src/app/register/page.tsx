'use client'

import { Input } from "@/shared/ui/Input"
import { Heading } from "@/shared/ui/Heading"
import { Button } from "@/shared/ui/Button"
import { Text } from "@/shared/ui/Text"
import Link from "next/link"
import { Routes } from "@/shared/config/routes"
import { PasswordInput } from "@/entities/auth/PasswordInput"
import { LoginWithDiscordButton } from "@/entities/auth/LoginWithDiscordButton"
import { z } from "zod"
import { SubmitEventHandler, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { AuthAPI } from "@/shared/api/auth"
import { cn } from "@/shared/lib/cn"
import { useOvertimeValue } from "@/shared/hooks/useOvertimeValue"
import { useRouter } from "next/navigation"

const FormDataShema = z.object({
    name: z.string().min(3, "The name must contain at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "The password must contain at least 6 characters"),
})

export default function Register() {
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const [ showErrors, setShowErrors ] = useState(false)
    const [ formError, setFormError ] = useState<string>()
    const formOvertimeError = useOvertimeValue(formError)

    const formData = { name, email, password }

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

    const validate = () => {
        const res = FormDataShema.safeParse(formData)

        if (res.success) return
        return Object.fromEntries(
            res.error.issues.map(e => ([e.path[0], e.message]))
        ) as Record<keyof z.infer<typeof FormDataShema>, string>
    }

    const submit: SubmitEventHandler = (event) => {
        event.preventDefault()

        const errors = validate()

        if (errors) {
            setShowErrors(true)
            return
        }

        mutate()
    }

    const errors = showErrors ? validate() : undefined

    return <div className="flex justify-center items-center h-full w-full">
        <div className="flex items-center flex-col gap-5 p-5 w-120 rounded-2xl bg-island">
            <Heading>Register</Heading>
            <form className="flex flex-col gap-5 w-full"
                  onSubmit={submit}
            >
                <Input className="bg-glade"
                       placeholder="Name"
                       errorMsg={name.length ? errors?.name : undefined}
                       onChange={e => {
                           setFormError(undefined)
                           setName(e.target.value)
                       }}
                />
                <Input className="bg-glade"
                       placeholder="Email"
                       errorMsg={email.length ? errors?.email : undefined}
                       onChange={e => {
                           setFormError(undefined)
                           setEmail(e.target.value)
                       }}
                />
                <PasswordInput className="bg-glade"
                               placeholder="Password"
                               errorMsg={password.length ? errors?.password : undefined}
                               onChange={e => {
                                   setFormError(undefined)
                                   setPassword(e.target.value)
                               }}
                />
                <Button className="bg-accent-island w-full group"
                        type="submit"
                        disabled={!!errors}
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