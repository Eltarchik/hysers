import { ServerCard } from "@/entities/server/ui/ServerCard"
import { serverAPI } from "@/entities/server/api"
import { LikeServerChip } from "@/entities/server/ui/LikeServerChip"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useServersKey } from "@/entities/server/ui/queryKeys"
import { Server } from "@/entities/server/types"
import { MouseEvent } from "react"
import { ServerCardSkeleton } from "@/entities/server/ui/ServerCardSkeleton"
import { ChipSkeleton } from "@/shared/ui/ChipSkeleton"

export const ServersList = () => {
    const queryClient = useQueryClient()
    const serversKey = useServersKey()

    const { data: servers, isPending } = useQuery({
        queryKey: serversKey,
        queryFn: async () => {
            const resp = await serverAPI.servers({ page: 1, quantity: 30 })
            if (resp.status === "success") return resp.data
        },
    })

    const { mutate: like } = useMutation({
        mutationFn: async (id: number) => {
            return await serverAPI.like(id)
        },
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({ queryKey: serversKey })

            const previousServers = queryClient.getQueryData<Server[]>(serversKey)

            queryClient.setQueryData<Server[] | undefined>(serversKey, old =>
                old?.map(server =>
                    server.id !== id
                        ? server
                        : {
                            ...server,
                            liked: !server.liked,
                            likes: server.likes + (server.liked ? -1 : 1),
                        }
                )
            )

            return { previousServers }
        },
        onError: (_err, _vars, context) => {
            if (!context?.previousServers) return

            queryClient.setQueryData(serversKey, context.previousServers)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: serversKey })
        },
    })

    const onToggleLike = (event: MouseEvent, id: number) => {
        event.stopPropagation()
        like(id)
    }

    if (isPending || !servers) return <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 w-full">
        <ServerCardSkeleton count={20}>
            <ChipSkeleton className="absolute right-5 -top-5 w-18" />
        </ServerCardSkeleton>
    </div>

    return <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 w-full">
        { servers?.map(server =>
            <ServerCard server={server} key={server.id}>
                <LikeServerChip className="absolute right-5 -top-5 transition-transform duration-400 ease-out hover:scale-108"
                                likes={server.likes}
                                liked={server.liked}
                                onToggleLike={event => onToggleLike(event, server.id)}
                />
            </ServerCard>
        )}
    </div>
}
