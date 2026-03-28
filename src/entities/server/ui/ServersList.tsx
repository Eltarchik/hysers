import { ServerCard } from "@/entities/server/ui/ServerCard"
import { serverAPI, SERVERS_IN_PAGE } from "@/entities/server/api"
import { LikeServerChip } from "@/entities/server/ui/LikeServerChip"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getServersKey, useServerStatusesKey } from "@/entities/server/ui/queryKeys"
import { Server } from "@/entities/server/types"
import { MouseEvent } from "react"
import { ServerCardSkeleton } from "@/entities/server/ui/ServerCardSkeleton"
import { ChipSkeleton } from "@/shared/ui/ChipSkeleton"
import { RootState } from "@/shared/config/store"
import { useSelector } from "react-redux"
import { RegionFilters } from "@/entities/filters/config/regions"
import { TagFilters } from "@/entities/filters/config/tags"

export const ServersList = () => {
    const queryClient = useQueryClient()
    const page = 0 // todo remove
    const filters = useSelector((state: RootState)=> state.filters.selected)

    const serversKey = getServersKey(filters, page)
    const serverStatusesKey = useServerStatusesKey(filters, page)

    const { data: serversWithoutStatus, isPending: serversIsPending } = useQuery({
        queryKey: serversKey,
        queryFn: async () => {
            const resp = await serverAPI.servers({
                page: page,
                quantity: SERVERS_IN_PAGE,
                filters: {
                    region: filters.regions[0] as RegionFilters,
                    tags: filters.tags.length > 0 ? (filters.tags as TagFilters[]) : undefined,
                }
            })
            if (resp.status === "success") return resp.data
        },
    })

    const { data: serverStatuses, isPending: serverStatusesIsPending } = useQuery({
        queryKey: serverStatusesKey,
        enabled: (serversWithoutStatus?.length ?? 0) > 0,
        queryFn: async () => {
            const resp = await serverAPI
                .statuses(serversWithoutStatus?.map(server => server.id) ?? [])
            if (resp.status === "success") return resp.data
        },
    })

    const idsToStatuses = (serverStatuses?.length ?? 0) <= 0
        ? undefined
        : Object.fromEntries(serverStatuses!
            .map(entry => [entry.id, entry.isOnline]))

    const servers = !idsToStatuses
        ? serversWithoutStatus
        : serversWithoutStatus?.map(server => ({
            ...server,
            isOnline: idsToStatuses[server.id] ?? server.isOnline
        }))

    const { mutate: toggleLike } = useMutation({
        mutationFn: async (id: number) => {
            return await serverAPI.like(id)
        },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: serversKey })

            const previousServers = queryClient.getQueryData<Server[]>(serversKey)

            queryClient.setQueryData<Server[] | undefined>(serversKey, prev =>
                prev?.map(server =>
                    server.id !== id
                        ? server
                        : {
                            ...server,
                            liked: !server.liked,
                            likesQuantity: server.likesQuantity + (server.liked ? -1 : 1),
                        }
                )
            )

            return { previousServers }
        },
        onError: (_err, _vars, context) => {
            if (!context?.previousServers) return

            queryClient.setQueryData(serversKey, context.previousServers)
        }
    })

    const onToggleLike = (event: MouseEvent, id: number) => {
        event.stopPropagation()
        toggleLike(id)
    }

    if (serversIsPending || !servers) return <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 w-full">
        <ServerCardSkeleton count={20}>
            <ChipSkeleton className="absolute right-5 -top-5 w-18" />
        </ServerCardSkeleton>
    </div>

    return <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 w-full">
        { servers?.map(server =>
            <ServerCard server={server} key={server.id}>
                <LikeServerChip className="absolute right-5 -top-5 transition-transform duration-400 ease-out hover:scale-108"
                                likes={server.likesQuantity}
                                liked={server.liked}
                                onToggleLike={event => onToggleLike(event, server.id)}
                />
            </ServerCard>
        )}
    </div>
}
