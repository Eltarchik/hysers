import { Filter, Filters } from "@/entities/filters/types"

export enum TagFilters {
    PVP = "PVP",
    PVE = "PVE",
    VANILLA = "VANILLA",
    SURVIVAL = "SURVIVAL",
    RP = "RP",
    RPG = "RPG",
    MINIGAMES = "MINIGAMES"
}

export const tagFilters: Filter = {
    name: Filters.TAGS,
    items: [
        { name: TagFilters.PVP },
        { name: TagFilters.PVE },
        { name: TagFilters.VANILLA },
        { name: TagFilters.SURVIVAL },
        { name: TagFilters.RP },
        { name: TagFilters.RPG },
        { name: TagFilters.MINIGAMES },
    ]
}