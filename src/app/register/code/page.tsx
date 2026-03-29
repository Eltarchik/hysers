'use client'

import { Text } from "@/shared/ui/Text"
import { Routes } from "@/shared/config/routes"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { authAPI } from "@/entities/auth/api/api"
import { cn } from "@/shared/lib/cn"
import { useOvertimeValue } from "@/shared/hooks/useOvertimeValue"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui/Button"
import Link from "next/link"
import { Heading } from "@/shared/ui/Heading"
import { isApiError } from "@/shared/api/responseSchemas"
import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { VerificationCodeInput } from "@/entities/auth/VerificationCodeInput"
import { registerErrorValidator } from "@/entities/auth/api/errorsValidator"

export default function Code() {
    const t = useTranslations("Pages.Register")
    const router = useRouter()

    const [ errorText, setErrorText ] = useState("")
    const overtimeErrorText = useOvertimeValue(errorText)

    const [ codeCanBeResent, setCodeCanBeResent ] = useState(false)

    const { mutate: sendCode, isPending: codeSending } = useMutation({
        mutationFn: async (code: string) => {
            return await authAPI.register(code)
        },
        onError: async (error) => {
            if (!isApiError(error)) return

            if (error.status === "validation_error") setErrorText(Object.values(error.errors)[0][0])
            else if (registerErrorValidator.invalidCode(error.message)) setErrorText(t("validation.invalidCode"))
            else if (registerErrorValidator.codeIsOutdated(error.message)) setCodeCanBeResent(true)
            else if (registerErrorValidator.invalidToken(error.message)) {
                router.push(Routes.REGISTER)
                // todo add popup notification
            }
            else setErrorText(error.message)

        },
        onSuccess: async () => {
            router.push(Routes.HOME)
        },
    })

    const { mutate: resendCode, isPending: codeResending } = useMutation({
        mutationFn: async () => {
            if (codeCanBeResent) return await authAPI.resendCode()
        },
        onError: async (error) => {
            if (!isApiError(error) || error.status === "validation_error") return

            setErrorText(error.message)
        },
        onSuccess: async () => {
            setCodeCanBeResent(false)
        },
    })

    return <div className="flex flex-1 justify-center items-center w-full">
        <div className="flex items-center flex-col gap-5 p-5 w-120 rounded-2xl bg-island">
            <div className="grid grid-cols-[40px_1fr_40px] items-center w-full">
                <Link href={Routes.REGISTER} className="flex justify-center items-center size-8 group">
                    <ArrowLeft className="text-element-sub group-hover:text-element-imp transition-colors duration-80 ease-in" />
                </Link>
                <Heading className="mx-auto">{t("title")}</Heading>
            </div>
            <div className="flex flex-col items-center gap-4 pt-8 w-full">
                <VerificationCodeInput error={!!errorText}
                                       onCodeEntered={code => sendCode(code)}
                                       onChange={() => setErrorText("")}
                />
                <Text small className={cn(
                    "text-center text-red-element opacity-0 min-h-5 overflow-hidden transition-opacity",
                    errorText && "opacity-100"
                )}
                >
                    { overtimeErrorText }
                </Text>
                <Button className="w-full bg-accent-island text-accent-element disabled:text-element-dis"
                        disabled={!codeCanBeResent}
                        onClick={() => resendCode()}
                >
                    <Text className="text-inherit">{t("resendCode")}</Text>
                </Button>
            </div>
        </div>
    </div>
}