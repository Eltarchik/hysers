import { tagFilters } from "@/entities/filters/config/tags"
import { regionFilters } from "@/entities/filters/config/regions"
import { Filter } from "@/entities/filters/types"


export const filters: Filter[] = [
    tagFilters, regionFilters
]