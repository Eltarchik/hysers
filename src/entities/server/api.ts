import { Server } from "@/entities/server/types"
import { TagFilters } from "@/entities/filters/config/tags"
import { RegionFilters } from "@/entities/filters/config/regions"

const mockServers: Server[] = [
    {
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

export class ServerAPI {
    private static BASE_URL = "/server"

    static servers = () => {
        return mockServers // todo change to api request
    }

}