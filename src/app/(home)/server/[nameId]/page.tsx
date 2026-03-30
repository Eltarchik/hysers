import { serverAPI } from "@/entities/server/api"
import { Heading } from "@/shared/ui/Heading"
import { notFound } from "next/navigation"
import { LikeServerChip } from "@/entities/server/ui/LikeServerChip"
import { Text } from "@/shared/ui/Text"
import Image from "next/image"
import { ServerInfoCard } from "@/entities/server/ui/serverPageCards/ServerInfoCard"
import { ServerRatingCard } from "@/entities/server/ui/serverPageCards/ServerRatingCard"
import { Metadata } from "next"
import { ServerTagsAndRegionCard } from "@/entities/server/ui/serverPageCards/ServerTagsAndRegionCard"
import { ServerOwnerCard } from "@/entities/server/ui/serverPageCards/ServerOwnerCard"
import { User } from "@/entities/user/types"
import { ServerContactsCard } from "@/entities/server/ui/serverPageCards/ServerContactsCard"
import { ServerStateBlock } from "@/wigets/ServerStateBlock"
import { ServerTeamBlock } from "@/wigets/ServerTeamBlock"


interface Params {
    params: Promise<{ nameId: string }>
}

export const revalidate = 3600

const mockUser: User = {
    name: "Eltar",
    email: "eltar-ion@yandex.ru"
} // todo remove

export default async function Server({
    params,
}: Params) {
    const { nameId } = await params
    try {
        const resp = await serverAPI.server(nameId)
        const server = resp.status === "success" ? resp.data : undefined

        if (!server) notFound()

        return <div className="grid grid-cols-2 xl:grid-cols-[4fr_9fr_4fr] gap-y-10 gap-x-5 xl:gap-x-10 max-w-440 w-full">
            <ServerTeamBlock user={mockUser} className="hidden xl:flex" />
            <div className="flex flex-col gap-5 col-span-2 xl:col-span-1">
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
            <ServerTeamBlock user={mockUser} className="xl:hidden" />
            <ServerStateBlock server={server} />
        </div>

    } catch (e) {
        notFound()
    }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { nameId } = await params

    const notFound: Metadata = {
        title: "Server not found"
    }

    try {
        const resp = await serverAPI.server(nameId)
        const server = resp.status === "success" ? resp.data : undefined

        if (!server) return notFound

        return {
            title: `${server.name}`,
            description: `${server.description}`,
            openGraph: {
                title: server.name,
                description: `${server.players} players`,
                type: "website",
            },
        }

    } catch (e) {
        return notFound
    }
}

