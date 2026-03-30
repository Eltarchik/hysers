'use client'

import { Server } from "@/entities/server/types"
import { BasicCard } from "@/entities/server/ui/serverPageCards/BasicCard"
import { Text } from "@/shared/ui/Text"
import { SmallChip } from "@/shared/ui/SmallChip"
import { useQuery } from "@tanstack/react-query"
import { getServerStatusKey } from "@/entities/server/queryKeys"
import { serverAPI } from "@/entities/server/api"
import { Copy } from "lucide-react"


type Props = Pick<Server, "id" | "nameId" | "players" | "domain" | "ip">

export const ServerInfoCard = ({
    id,
    nameId,
    players,
    domain,
    ip,
}: Props) => {
    const { data: status, isPending } = useQuery({
        queryKey: getServerStatusKey(nameId),
        queryFn: async () => {
            const resp = await serverAPI.status(id)
            if (resp.status === "success") return resp.data
        }
    })

    const isOnline = status?.isOnline
    const onlineText = `${isOnline && players ? players : ""} ${isOnline ? "online" : "offline"}`

    const copyInfo = (info: string) => {
        console.log(info) // todo add copying
    }

    return <BasicCard>
        { isPending
            ? <div className="flex h-10 w-30 rounded-full bg-glade" />
            : <SmallChip className="h-10 w-fit"
                         textClassName="text-xl"
                         colors={ isOnline ? "accent" : "basic" }
            >
                { onlineText }
            </SmallChip>
        }
        <button className="flex gap-2 cursor-pointer"
                onClick={() => domain && copyInfo(domain)}
        >
            <Text className="text-element-sub">domain</Text>
            <Text>{ domain }</Text>
            <Copy />
        </button>
        <button className="flex gap-2 cursor-pointer"
                onClick={() => ip && copyInfo(ip)}
        >
            <Text className="text-element-sub">ip</Text>
            <Text>{ ip }</Text>
            <Copy />
        </button>
    </BasicCard>
}
