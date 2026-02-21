interface FilterItem {
    name: string
}

export interface Filter {
    name: Filters
    items: FilterItem[]
}

export enum Filters {
    TAGS = "tags",
    REGIONS = "regions",
}

export enum SortCriteria {
    ONLINE = "online",
    POPULAR = "popular",
    HOT = "hot",
    NEW = "new",
}

export enum SortDirection {
    UP = "up",
    DOWN = "down",
}