export enum TagFilters {
    PVP = "pvp",
    PVE = "pve",
    VANILLA = "vanilla",
    SURVIVAL = "survival",
    RP = "rp",
    RPG = "rpg",
    MINI_GAMES = "mini_games"
}

export const tagFilters: Filter = {
    name: "tags",
    items: [
        { name: TagFilters.PVP },
        { name: TagFilters.PVE },
        { name: TagFilters.VANILLA },
        { name: TagFilters.SURVIVAL },
        { name: TagFilters.RP },
        { name: TagFilters.RPG },
        { name: TagFilters.MINI_GAMES },
    ]
}