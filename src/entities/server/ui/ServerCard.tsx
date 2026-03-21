import { Heading } from "@/shared/ui/Heading"
import { Text } from "@/shared/ui/Text"
import { SmallChip } from "@/shared/ui/SmallChip"
import { Server } from "@/entities/server/types"
import { useTranslations } from "next-intl"
import { Routes } from "@/shared/config/routes"
import { useRouter } from "next/navigation"
import { ChildrenProp } from "@/shared/ui/propsPresets"
import Image from "next/image"

type Props = {
    server: Server
} & ChildrenProp

export const ServerCard = (
    { server, children }: Props
) => {
    const t = useTranslations(`Entities.Filters.tags`)
    const href = Routes.SERVER(server.nameId)
    const router = useRouter()

    return <div className="flex flex-col overflow-hidden rounded-2xl bg-island cursor-pointer"
                onClick={() => router.push(href)}
    >
        <div className="relative w-full h-40 bg-glade">
            { server.poster &&
                <Image className="object-cover opacity-0 transition-opacity duration-80 ease-in"
                       src={server.poster}
                       alt="banner"
                       sizes="380px"
                       fill
                       loading="eager"
                       onLoad={event => event.currentTarget.style.opacity = "1"}
                /> // todo add protection from a bad url
            }
        </div>
        <div className="relative flex flex-col gap-2 p-5 w-full">
            { children }
            <Heading className="truncate leading-8">
                { server.name }
            </Heading>
            <Text small className="line-clamp-3 text-ellipsis text-element-sub h-15">
                { server.description }
            </Text>
            <div className="flex gap-2">
                { server.isOnline !== undefined &&
                    <SmallChip colors={ server.isOnline ? "accent" : "basic" }>
                        { server.isOnline && server.players } { server.isOnline ? "online" : "offline" }
                    </SmallChip>
                }
                { server.tags.length &&
                    <SmallChip colors="basic">{ t(server.tags[0]) }</SmallChip>
                }
            </div>
        </div>
    </div>
}