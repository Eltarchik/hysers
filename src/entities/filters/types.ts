interface FilterItem {
    name: string
}

export interface Filter {
    name: Filters
    items: FilterItem[]
}

export enum Filters {
    TAGS = "tags",
    REGIONS = "regions"
}