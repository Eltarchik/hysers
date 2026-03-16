import { Server } from "@/entities/server/types"
import { TagFilters } from "@/entities/filters/config/tags"
import { RegionFilters } from "@/entities/filters/config/regions"

const mockServers: Server[] = [
    {
        id: 1,
        nameId: "hygames",
        name: "Hygames",
        description: "Welcome to our Hytale RPG Survival Server – a balanced experience focused on long-term progression, cooperation, and quality-of-life features",
        poster: undefined,
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
        poster: undefined,
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
        poster: undefined,
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
        poster: undefined,
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
        poster: undefined,
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
        poster: undefined,
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
        poster: undefined,
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

    servers = async (data: ServersDTO) => {
        return mockServers // todo change to api request
    }

    like = async (id: number) => {
        // todo add api request
    }
}

export const serverAPI = new ServerAPI()