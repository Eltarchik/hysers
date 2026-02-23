import { ServerCard } from "@/entities/server/ServerCard"
import { ServerAPI } from "@/entities/server/api"
import { ServerLikes } from "@/entities/server/ServerLIkes"


export const ServerCards = () => {
    const servers = ServerAPI.servers()

    return <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 w-full">
        { servers.map(server =>
            <ServerCard server={server} key={server.nameId}>
                <ServerLikes className="absolute right-5 -top-5"
                             likes={server.likes}
                             liked={server.liked}
                             onClick={() => console.log(server.name)}
                />
            </ServerCard>
        )}
    </div>
}
