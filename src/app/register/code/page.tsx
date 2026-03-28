'use client'

import { Input } from "@/shared/ui/Input"
import { Text } from "@/shared/ui/Text"
import { Routes } from "@/shared/config/routes"
import { PasswordInput } from "@/entities/auth/PasswordInput"
import { z } from "zod"
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { authAPI } from "@/entities/auth/api"
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
import { VerificationCodeInput } from "@/entities/auth/VerificationCodeInput"

export default function Register() {
    const t = useTranslations("Pages.Register")
    const router = useRouter()

    const [ errorText, setErrorText ] = useState("")
    const overtimeErrorText = useOvertimeValue(errorText)

    const { mutate: sendCode, isPending: codeSending } = useMutation({
        mutationFn: async (code: string) => {
            return await authAPI.register(code)
        },
        onError: async (error) => {
            if (!isApiError(error)) return
            if (error.status === "validation_error") setErrorText(Object.values(error.errors)[0][0])
            else setErrorText(error.message)
        },
        onSuccess: async () => {
            router.push(Routes.REGISTER_CODE)
        }
    })

    return <div className="flex flex-1 justify-center items-center w-full">
        <div className="flex items-center flex-col gap-5 p-5 w-120 rounded-2xl bg-island">
            <div className="grid grid-cols-[40px_1fr_40px] items-center w-full">
                <Link href={Routes.REGISTER} className="flex justify-center items-center size-8 group">
                    <ArrowLeft className="text-element-sub group-hover:text-element-imp transition-colors duration-80 ease-in" />
                </Link>
                <Heading className="mx-auto">{t("title")}</Heading>
            </div>
            <div className="flex flex-col items-center gap-8 py-8 w-full">
                <VerificationCodeInput error={!!errorText}
                                       onCodeEntered={code => sendCode(code)}
                                       onChange={() => setErrorText("")}
                />
                <Text small className={cn(
                    "text-red-element opacity-0 h-0 -mt-5 overflow-hidden transition-[height,opacity,margin]",
                    errorText && "opacity-100 h-5 mt-0"
                )}
                >
                    { overtimeErrorText }
                </Text>
            </div>
        </div>
    </div>
}