import { TagFilters } from "@/entities/filters/config/tags"
import { RegionFilters } from "@/entities/filters/config/regions"

export interface Server {
    id: number
    nameId: string
    name: string
    description: string
    poster?: string
    likes: number
    liked: boolean
    isOnline?: boolean
    players?: number
    tags: TagFilters[]
    region: RegionFilters
}