import { Menu, Moon, Search } from "lucide-react"
import Link from "next/link"
import { Routes } from "@/shared/config/routes"
import { Heading } from "@/shared/ui/Heading"
import { Text } from "@/shared/ui/Text"
import { SmallChip } from "@/shared/ui/SmallChip"
import { Button } from "@/shared/ui/Button"

export const Header = () => {
    return <header className="grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_2fr_1fr] gap-10 h-12 max-w-440 w-full">
        <div className="flex items-center gap-5">
            <Button className="px-0 size-12">
                <Menu />
            </Button>
            <Link href={Routes.HOME}>
                <Heading size="lg">HyGames</Heading>
            </Link>
            <SmallChip colors={"accent"}>52 servers</SmallChip>
        </div>

        <label className="flex items-center gap-2 px-5 h-12 w-full rounded-2xl bg-island">
            <input className="flex w-full"
                   type="search"
                   placeholder="Find server"
            />
            <Search color="var(--element-dis)" />
        </label>

        <div className="flex gap-5">
            <Button className="px-0 size-12">
                <Moon />
            </Button>
            <Button className="w-24">
                <Text>EN</Text>
            </Button>
            <Button className="flex-1 bg-accent-island">
                <Text className="text-accent-element text-nowrap">Sign In</Text>
            </Button>
        </div>
    </header>
}