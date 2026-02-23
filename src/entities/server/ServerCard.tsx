import { Heading } from "@/shared/ui/Heading"
import { Text } from "@/shared/ui/Text"
import { SmallChip } from "@/shared/ui/SmallChip"
import { ReactNode } from "react"
import { Server } from "@/entities/server/types"
import { useTranslations } from "next-intl"

interface Props {
    server: Server
    children?: ReactNode
}

export const ServerCard = (
    { server, children }: Props
) => {
    const t = useTranslations(`Entities.Filters.tags`)

    return <div className="flex flex-col overflow-hidden rounded-2xl bg-island">
        <div className="w-full h-40 bg-glade" />
        <div className="relative flex flex-col gap-2 p-5 w-full">
            <Heading className="truncate">{ server.name }</Heading>
            <Text small className="line-clamp-3 text-ellipsis text-element-sub mb-1">
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
            { children }
        </div>
    </div>
}