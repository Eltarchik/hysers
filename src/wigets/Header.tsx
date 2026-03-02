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

export const Header = () => {
    return <header className="grid grid-cols-3 xl:grid-cols-[4fr_9fr_4fr] gap-10 h-12 max-w-440 w-full">
        <div className="flex items-center gap-5">
            <Button className="px-0 size-12">
                <Menu />
            </Button>
            <Link href={Routes.HOME}>
                <Heading size="lg">HyGames</Heading>
            </Link>
            <SmallChip colors={"accent"} className="hidden 2xl:flex">52 servers</SmallChip>
        </div>

        <Input type="search" placeholder="Find server">
            <Search color="var(--element-dis)" />
        </Input>

        <div className="flex gap-5">
            <ChangeThemeButton />
            <ChangeLocaleButton />
            <SIgnInButton />
        </div>
    </header>
}