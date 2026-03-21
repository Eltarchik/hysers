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
import { errorHandler } from "@/shared/api/responseSchemas"
import { cn } from "@/shared/lib/cn"

export const Header = () => {
    const { data: user, isPending: userIsPending } = useQuery({
        queryKey: ["user", "meta"],
        queryFn: async () => {
            const data = await userAPI.meta()
            if (data.status === "success") return data.data
        },
        retry: (failureCount, error: any) => {
            const err = errorHandler(error)
            if (err?.status === "error" && (err.code === 401 || err.message === "Unauthorized")) return false
            return failureCount < 3
        },
    })

    const { data: serversQuantity } = useQuery({
        queryKey: ["servers", "quantity"],
        queryFn: async () => {
            const data = await serverAPI.quantity()
            if (data.status === "success") return data.data
        },
    })

    return <header className="grid grid-cols-3 xl:grid-cols-[4fr_9fr_4fr] gap-10 h-12 max-w-440 w-full">
        <div className="flex items-center gap-5">
            <Button className="px-0 size-12">
                <Menu />
            </Button>
            <Link href={Routes.HOME}>
                <Heading size="lg">HyGames</Heading>
            </Link>
            <SmallChip colors={"accent"} className="hidden 2xl:flex">
                { serversQuantity ?? "..." } servers
            </SmallChip>
        </div>

        <Input type="search" placeholder="Find server">
            <Search color="var(--element-dis)" />
        </Input>

        <div className="flex gap-5">
            <ChangeThemeButton />
            <ChangeLocaleButton />
            <div className={cn("flex justify-end flex-1 opacity-0 transition-opacity duration-80 ease-in", !userIsPending && "opacity-100")}>
                { user
                    ? <UserMetaCard user={user} />
                    : <SIgnInButton/>
                }
            </div>
        </div>
    </header>
}