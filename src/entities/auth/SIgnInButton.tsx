'use client'

import { Button } from "@/shared/ui/Button"
import { Text } from "@/shared/ui/Text"
import { useRouter } from "next/navigation"
import { Routes } from "@/shared/config/routes"
import { useTranslations } from "next-intl"

export const SIgnInButton = () => {
    const router = useRouter()
    const t = useTranslations("Shared.Auth")

    return <Button className="flex-1 bg-accent-island"
                   onClick={() => router.push(Routes.LOGIN)}
    >
        <Text className="text-accent-element text-nowrap">{t("signIn")}</Text>
    </Button>
}