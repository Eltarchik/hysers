import { ServerCard } from "@/entities/server/ServerCard"
import { ServerAPI } from "@/entities/server/api"
import { ServerLikes } from "@/entities/server/ServerLIkes"
import { MouseEvent } from "react"


export const ServerCards = () => {
    const servers = ServerAPI.servers()

    const onLikeClick = (event: MouseEvent, serverId: number) => {
        event.stopPropagation()

        ServerAPI.like(serverId)
    }

    return <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 w-full">
        { servers.map(server =>
            <ServerCard server={server} key={server.id}>
                <ServerLikes className="absolute right-5 -top-5"
                             likes={server.likes}
                             liked={server.liked}
                             onClick={event => onLikeClick(event, server.id)}
                />
            </ServerCard>
        )}
    </div>
}
