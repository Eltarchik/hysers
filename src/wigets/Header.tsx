import { Menu, Moon, Search } from "lucide-react"
import Link from "next/link"
import { Routes } from "@/shared/config/routes"
import { Heading } from "@/shared/ui/Heading"
import { Text } from "@/shared/ui/Text"
import { SmallChip } from "@/shared/ui/SmallChip"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { ChangeLocaleButton } from "@/wigets/ChangeLocaleButton"

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

        <Input type="search" placeholder="Find server">
            <Search color="var(--element-dis)" />
        </Input>

        <div className="flex gap-5">
            <Button className="px-0 size-12">
                <Moon />
            </Button>
            <ChangeLocaleButton />
            <Button className="flex-1 bg-accent-island">
                <Text className="text-accent-element text-nowrap">Sign In</Text>
            </Button>
        </div>
    </header>
}