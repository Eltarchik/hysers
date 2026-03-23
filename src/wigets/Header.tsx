'use client'

import { Menu, Search } from "lucide-react"
import Link from "next/link"
import { Routes } from "@/shared/config/routes"
import { Heading } from "@/shared/ui/Heading"
import { SmallChip } from "@/shared/ui/SmallChip"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { ChangeLocaleButton } from "@/wigets/ChangeLocaleButton"
import { ChangeThemeButton } from "@/wigets/ChangeThemeButton"
import { SIgnInButton } from "@/entities/auth/SIgnInButton"
import { UserMetaCard } from "@/entities/user/UserMetaCard"
import { useQuery } from "@tanstack/react-query"
import { userAPI } from "@/entities/user/api"
import { serverAPI } from "@/entities/server/api"
import { isApiError } from "@/shared/api/responseSchemas"
import { cn } from "@/shared/lib/cn"
import { useTranslations } from "next-intl"
import { UserPopupMenu } from "@/wigets/UserPopupMenu"
import { userMetaKey } from "@/entities/user/queryKeys"
import { useState } from "react"
import { useOverlay } from "@/shared/hooks/useOverlay"

export const Header = () => {
    const t = useTranslations("Shared.Header")
    const { data: user, isPending: userIsPending } = useQuery({
        queryKey: userMetaKey,
        queryFn: async () => {
            const data = await userAPI.meta()
            if (data.status === "success") return data.data
        },
        retry: (failureCount, error: any) => {
            if (isApiError(error)
                && error?.status === "error"
                && (error.code === 401 || error.message === "Unauthorized")
            ) return false
            return failureCount < 3
        }
    })

    const { data: serversQuantity } = useQuery({
        queryKey: ["servers", "quantity"],
        queryFn: async () => {
            const data = await serverAPI.quantity()
            if (data.status === "success") return data.data
        },
    })

    const [ userMenuOpened, setUserMenuOpened, userMetaCardRef ] = useOverlay<HTMLDivElement>()

    return <header className="sticky top-0 z-100 grid grid-cols-3 xl:grid-cols-[4fr_9fr_4fr] gap-10 py-5 h-22 max-w-440 w-full bg-space">
        <div className="flex items-center gap-5">
            <Button className="px-0 size-12">
                <Menu />
            </Button>
            <Link href={Routes.HOME}>
                <Heading size="lg">HyGames</Heading>
            </Link>
            <SmallChip colors={"accent"} className="hidden 2xl:flex">
                { serversQuantity != null
                    ? t("serversCount", { count: serversQuantity })
                    : t("serversLoading") }
            </SmallChip>
        </div>

        <Input type="search" placeholder={t("findServer")}>
            <Search color="var(--element-dis)" />
        </Input>

        <div className="flex gap-5">
            <ChangeThemeButton />
            <ChangeLocaleButton />
            <div className={cn("flex justify-end flex-1 opacity-0 transition-opacity duration-80 ease-in", !userIsPending && "opacity-100")}>
                { !user
                    ? <SIgnInButton />
                    : <div className="relative" ref={userMetaCardRef}>
                        <UserMetaCard user={ user }
                                      onClick={() => setUserMenuOpened(prev => !prev)}
                        />
                        { userMenuOpened &&
                            <UserPopupMenu className="absolute top-full translate-y-2 right-0 w-fit"/>
                        }
                    </div>
                }
            </div>
        </div>
    </header>
}