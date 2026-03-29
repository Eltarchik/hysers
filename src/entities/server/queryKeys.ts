import { Filters } from "@/entities/filters/types"

export const getServerKey = (nameId: string) => {
    return ["server", nameId]
}

export const getServersKey = (filters: Record<Filters, string[]>, page: number) => {
    return ["servers", filters.regions, filters.tags, page]
}

export const getServerStatusesKey = (filters: Record<Filters, string[]>, page: number) => {
    const serversKey = getServersKey(filters, page)
    return [...serversKey, "statuses"]
}