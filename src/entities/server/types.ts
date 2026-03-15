import { TagFilters } from "@/entities/filters/config/tags"
import { RegionFilters } from "@/entities/filters/config/regions"
import { z } from "zod"

const serverSchema = z.object({
    id: z.number(),
    nameId: z.string(),
    name: z.string(),
    description: z.string(),
    poster: z.string().nullable(),
    likes: z.number(),
    tags: z.string(),
    region: z.string(),
})

export interface Server {
    id: number
    nameId: string
    name: string
    description: string
    poster?: string
    likes: number
    liked: boolean // todo
    isOnline?: boolean // todo
    players?: number // todo
    tags: TagFilters[]
    region: RegionFilters
}