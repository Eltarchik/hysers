import { Filter, Filters } from "@/entities/filters/types"

export enum RegionFilters {
    CIS = "cis",
    EUROPE = "europe",
    AFRICA = "africa",
    ASIAN = "asian",
    SOUTH_AMERICA = "south_america",
    NORTH_AMERICA = "north_america",
}

export const regionFilters: Filter = {
    name: Filters.REGIONS,
    items: [
        { name: RegionFilters.CIS },
        { name: RegionFilters.EUROPE },
        { name: RegionFilters.AFRICA },
        { name: RegionFilters.ASIAN },
        { name: RegionFilters.SOUTH_AMERICA },
        { name: RegionFilters.NORTH_AMERICA },
    ]
}