import { serverAPI } from "@/entities/server/api"
import { Heading } from "@/shared/ui/Heading"
import { notFound } from "next/navigation"
import { LikeServerChip } from "@/entities/server/ui/LikeServerChip"
import { Text } from "@/shared/ui/Text"
import Image from "next/image"
import { ServerInfoCard } from "@/entities/server/ui/serverPageCards/ServerInfoCard"
import { ServerRatingCard } from "@/entities/server/ui/serverPageCards/ServerRatingCard"


interface Params {
    params: Promise<{ nameId: string }>
}

export const revalidate = 3600

export default async function Server({
    params,
}: Params) {
    const { nameId } = await params
    try {
        const resp = await serverAPI.server(nameId)
        const server = resp.status === "success" ? resp.data : undefined

        if (!server) notFound()

        return <div className="grid grid-cols-1 xl:grid-cols-[4fr_9fr_4fr] gap-10 max-w-440 w-full">
            <div className="flex flex-col gap-5">
                <div className="flex w-full h-40 rounded-2xl bg-island">
                    todo: user
                </div>
                <div className="flex w-full h-40 rounded-2xl bg-island">
                    todo: contacts
                </div>
                <div className="flex w-full h-40 rounded-2xl bg-island">
                    todo: ads
                </div>
            </div>
            <div className="flex flex-col gap-5">
                { server.poster &&
                    <Image className="flex w-full h-60 object-cover rounded-2xl bg-glade"
                           src={ server.poster }
                           alt="banner"
                           width={880}
                           height={240} />
                }
                <div className="flex gap-4 justify-between">
                    <Heading size="md">{ server.name }</Heading>
                    <LikeServerChip likes={server.likesQuantity} liked={server.liked} />
                </div>
                <Text className="text-element-sub">
                    { server.description }
                </Text>
            </div>
            <div className="flex flex-col gap-5">
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
                <div className="flex w-full h-40 rounded-2xl bg-island">
                    todo: tags and region
                </div>
            </div>
        </div>

    } catch (e) {
        notFound()
    }
}
