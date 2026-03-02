'use client'

import { Button } from "@/shared/ui/Button"
import { Text } from "@/shared/ui/Text"
import { useRouter } from "next/navigation"
import { Routes } from "@/shared/config/routes"

export const SIgnInButton = () => {
    const router = useRouter()

    return <Button className="flex-1 bg-accent-island"
                   onClick={() => router.push(Routes.LOGIN)}
    >
        {/*  todo integrate locale  */}
        <Text className="text-accent-element text-nowrap">Sign In</Text>
    </Button>
}