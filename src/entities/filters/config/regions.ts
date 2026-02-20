export enum RegionFilters {
    CIS = "cis",
    EUROPE = "europe",
    ASIAN = "asian",
    AFRICA = "africa",
    NORTH_AMERICA = "north_america",
    SOUTH_AMERICA = "south_america",
}

export const regionFilters: Filter = {
    name: "regions",
    items: [
        { name: RegionFilters.CIS },
        { name: RegionFilters.EUROPE },
        { name: RegionFilters.ASIAN },
        { name: RegionFilters.AFRICA },
        { name: RegionFilters.NORTH_AMERICA },
        { name: RegionFilters.SOUTH_AMERICA },
    ]
}