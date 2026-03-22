import { Filter, Filters } from "@/entities/filters/types"

export enum RegionFilters {
    CIS = "CIS",
    EUROPE = "EUROPE",
    AFRICA = "AFRICA",
    ASIAN = "ASIAN",
    SOUTH_AMERICA = "SOUTHAMERICA",
    NORTH_AMERICA = "NORTHAMERICA",
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