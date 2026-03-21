import { TagFilters } from "@/entities/filters/config/tags"
import { RegionFilters } from "@/entities/filters/config/regions"
import { z } from "zod"

export const serverSchema = z.object({
    id: z.number(),
    nameId: z.string(),
    name: z.string(),
    description: z.string(),
    poster: z.string().nullish(),
    likes: z.number(),
    liked: z.boolean(),
    isOnline: z.boolean().nullish(),
    players: z.number().nullish(),
    tags: z.enum(TagFilters).array(),
    region: z.enum(RegionFilters),
})

export type Server = z.infer<typeof serverSchema>