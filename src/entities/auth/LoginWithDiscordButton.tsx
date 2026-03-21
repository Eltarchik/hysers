"use client"

import Image from "next/image"
import { Text } from "@/shared/ui/Text"
import { Button } from "@/shared/ui/Button"
import { useTranslations } from "next-intl"

export const LoginWithDiscordButton = () => {
    const t = useTranslations("Shared.Auth")

    return <Button className="gap-4 w-full bg-[#1B1B5B]" type="submit">
        <Image className="size-6"
               src="discord-logo.svg"
               alt="discord logo"
               width={24}
               height={24}
               unoptimized
        />
        <Text className="text-[#5865F2]">{t("loginWithDiscord")}</Text>
    </Button>
}