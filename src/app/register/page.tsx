'use client'

import { Input } from "@/shared/ui/Input"
import { Text } from "@/shared/ui/Text"
import { Routes } from "@/shared/config/routes"
import { PasswordInput } from "@/entities/auth/PasswordInput"
import { z } from "zod"
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { authAPI } from "@/entities/auth/api/api"
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
import { useTranslations } from "next-intl"

export default function Register() {
    const t = useTranslations("Pages.Register")
    const formDataShema = useMemo(
        () =>
            z.object({
                name: z.string().min(3, t("validation.nameMin")),
                email: z.email(t("validation.invalidEmail")),
                password: z.string().min(6, t("validation.passwordMin")),
            }),
        [t]
    )

    type FormData = z.infer<typeof formDataShema>

    const router = useRouter()

    const { mutate: sendForm, isPending: formSending } = useMutation({
        mutationFn: async () => {
            return await authAPI.initRegister(formData)
        },
        onError: async (error) => {
            if (!isApiError(error)) return
            if (error.status === "validation_error") setFormError(Object.values(error.errors)[0][0])
            else setFormError(error.message)
        },
        onSuccess: async () => {
            router.push(Routes.REGISTER_CODE)
        }
    })


    const initialFormData: FormData = {
        name: "",
        email: "",
        password: "",
    }

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
        sendForm()
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
                <Heading className="mx-auto">{t("title")}</Heading>
            </div>
            <form className="flex flex-col gap-5 w-full"
                  onSubmit={submit}
            >
                <Input className="bg-glade"
                       placeholder={t("name")}
                       errorMsg={formData.name.length ? fieldErrors?.name : undefined}
                       onChange={e => onFieldChange(e, "name")}
                       onBlur={validateField.name}
                />
                <Input className="bg-glade"
                       placeholder={t("email")}
                       errorMsg={formData.email.length ? fieldErrors?.email : undefined}
                       onChange={e => onFieldChange(e, "email")}
                       onBlur={validateField.email}
                />
                <PasswordInput className="bg-glade"
                               placeholder={t("password")}
                               errorMsg={formData.password.length ? fieldErrors?.password : undefined}
                               onChange={e => onFieldChange(e, "password")}
                               onBlur={validateField.password}
                />
                <Button className="bg-accent-island w-full group"
                        type="submit"
                        disabled={!isValid}
                >
                    <Text className="text-accent-element group-disabled:text-element-dis">
                        { formSending ? t("loading") : t("submit") }
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
                <Text small className="text-element-sub text-center">{t("or")}</Text>
                <LoginWithDiscordButton />
            </div>
            <span className="flex gap-1">
                <Text small className="text-element-sub">{t("hasAccount")}</Text>
                <Link href={Routes.LOGIN}>
                    <Text small className="text-accent-element">{t("signIn")}</Text>
                </Link>
            </span>
        </div>
    </div>
}