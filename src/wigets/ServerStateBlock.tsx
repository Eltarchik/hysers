import { ServerInfoCard } from "@/entities/server/ui/serverPageCards/ServerInfoCard"
import { ServerRatingCard } from "@/entities/server/ui/serverPageCards/ServerRatingCard"
import { ServerTagsAndRegionCard } from "@/entities/server/ui/serverPageCards/ServerTagsAndRegionCard"
import { Server } from "@/entities/server/types"
import { cn } from "@/shared/lib/cn"
import { ClassProp } from "@/shared/ui/propsPresets"

type Props = {
    server: Server
} & ClassProp

export const ServerStateBlock = (
    { server, className }: Props
) => {
    return <div className={cn("flex flex-col gap-5", className)}>
        <ServerInfoCard id={server.id}
                        nameId={server.name}
                        domain={server.domain}
                        ip={server.ip}
                        players={server.players}
        />
        <ServerRatingCard number={666} />
        { server.tags.length &&
            <ServerRatingCard number={1} tag={server.tags[0]}/>
            // todo integrate real rating
        }
        <ServerTagsAndRegionCard tags={server.tags} region={server.region ?? undefined} />
    </div>
}