import { Server, serverSchema } from "@/entities/server/types"
import { TagFilters } from "@/entities/filters/config/tags"
import { RegionFilters } from "@/entities/filters/config/regions"
import { axiosAuthorized } from "@/shared/api/interceptors"
import { z } from "zod"
import { createApiResponseSchema } from "@/shared/api/responseSchemas"

const mockServers: Server[] = [
    {
        id: 1,
        nameId: "hygames",
        name: "Hygames",
        description: "Welcome to our Hytale RPG Survival Server – a balanced experience focused on long-term progression, cooperation, and quality-of-life features",
        poster: "https://media.discordapp.net/attachments/1013854342106857544/1461443653066031155/image.png?ex=69bef2f7&is=69bda177&hm=08981dbb980f0d1c0469cbe320413136d3ec23d13b6b0c273c86485591aeceed&=&format=webp",
        likes: 169,
        liked: true,
        isOnline: true,
        players: 384,
        tags: [TagFilters.PVP, TagFilters.PVE],
        region: RegionFilters.CIS,
    },
    {
        id: 2,
        nameId: "runeteria",
        name: "Runeteria",
        description: "Welcome to our Hytale RPG Survival Server – a balanced experience focused on long-term progression, cooperation, and quality-of-life features",
        poster: "https://media.discordapp.net/attachments/1013854342106857544/1461442510038499338/image.png?ex=69bef1e6&is=69bda066&hm=65be7f03277ff6c6546a75eeb18150860474223cd47ba5a233e4305f81ddaf93&=&format=webp",
        likes: 52,
        liked: false,
        isOnline: true,
        players: 12,
        tags: [TagFilters.MINI_GAMES],
        region: RegionFilters.EUROPE,
    },
    {
        id: 3,
        nameId: "hytown",
        name: "Hytown",
        description: "Welcome to our Hytale RPG Survival Server – a balanced experience focused on long-term progression, cooperation, and quality-of-life features",
        poster: "https://media.discordapp.net/attachments/1013854342106857544/1461443696670146562/image.png?ex=69bef301&is=69bda181&hm=1b7fbf3fc9bbb8859eef861a31f056c52c5c332e6bf604d90d77bfa5293e6e7d&=&format=webp",
        likes: 51,
        liked: false,
        isOnline: false,
        players: undefined,
        tags: [TagFilters.RP],
        region: RegionFilters.AFRICA,
    },
    {
        id: 4,
        nameId: "dogecraft",
        name: "Dogecraft",
        description: "Welcome to our Hytale RPG Survival Server – a balanced experience focused on long-term progression, cooperation, and quality-of-life features",
        poster: "https://media.discordapp.net/attachments/1013854342106857544/1461442837655847002/image.png?ex=69bef234&is=69bda0b4&hm=3be69a753e28e224cc228b31ebd1e75b05b8814b72938ca4802b11c517e66fc3&=&format=webp",
        likes: 48,
        liked: false,
        isOnline: undefined,
        players: undefined,
        tags: [TagFilters.VANILLA, TagFilters.RP],
        region: RegionFilters.CIS,
    },
    {
        id: 5,
        nameId: "lotus-hytale",
        name: "Lotus Hytale",
        description: "Welcome to our Hytale RPG Survival Server – a balanced experience focused on long-term progression, cooperation, and quality-of-life features",
        poster: "https://media.discordapp.net/attachments/1013854342106857544/1461442908631728149/image.png?ex=69bef245&is=69bda0c5&hm=d02e3da06e4e12dcc068e146d82e027784d2249252d96de56ecfcdc336a9c0e8&=&format=webp",
        likes: 39,
        liked: false,
        isOnline: true,
        players: 2,
        tags: [TagFilters.SURVIVAL],
        region: RegionFilters.ASIAN,
    },
    {
        id: 6,
        nameId: "minishoot",
        name: "Minishoot",
        description: "Welcome to our Hytale RPG Survival Server – a balanced experience focused on long-term progression, cooperation, and quality-of-life features",
        poster: "https://media.discordapp.net/attachments/1013854342106857544/1463200660605632645/latest.png?ex=69bebfce&is=69bd6e4e&hm=e7cdd80e086095485d13b8284a8d24ba41860d3f366d08552b1ee359c6d8e41c&=&format=webp",
        likes: 36,
        liked: true,
        isOnline: true,
        players: undefined,
        tags: [TagFilters.MINI_GAMES],
        region: RegionFilters.ASIAN,
    },
    {
        id: 7,
        nameId: "woa",
        name: "WoA",
        description: "Welcome to our Hytale RPG Survival Server – a balanced experience focused on long-term progression, cooperation, and quality-of-life features",
        poster: "https://media.discordapp.net/attachments/1013854342106857544/1461442672458858576/image.png?ex=69bef20d&is=69bda08d&hm=adffd378a1708c88f8f38afa3bb01d6eb8d5e5df1356d05246e6ae3f1e819a4f&=&format=webp",
        likes: 36,
        liked: false,
        isOnline: false,
        players: 148,
        tags: [TagFilters.PVP],
        region: RegionFilters.SOUTH_AMERICA,
    },
]

interface FiltersDto {
    tags?: TagFilters[]
    region?: RegionFilters // todo change to array
}

type SortType = "asc" | "desc"

interface OrderDto {
    likes?: SortType
    createdAt?: SortType
}

interface ServersDTO {
    page: number
    quantity: number
    filters?: FiltersDto
    order?: OrderDto
}

class ServerAPI {
    private BASE_URL = "/server"

    private serversSchema = createApiResponseSchema(serverSchema.array().nullish())
    servers = async (data: ServersDTO) => {
        const resp = await axiosAuthorized.post(this.BASE_URL, data)
        const parsed = this.serversSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        const r: z.infer<typeof this.serversSchema> = {
            status: "success",
            data: mockServers
        } // todo remove

        return r // todo change to parsed.data
    }

    private respLikeSchema = createApiResponseSchema(z.undefined())
    like = async (id: number) => {
        const resp = await axiosAuthorized.post(this.BASE_URL, { id })
        const parsed = this.respLikeSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        return parsed.data
        // todo add api request
    }
}

export const serverAPI = new ServerAPI()