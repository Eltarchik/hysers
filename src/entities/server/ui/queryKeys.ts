import { useSelector } from "react-redux"
import { RootState } from "@/shared/config/store"
import { Filters } from "@/entities/filters/types"

export const getServersKey = (filters: Record<Filters, string[]>, page: number) => {
    return ["servers", filters.regions, filters.tags, page]
}

export const useServerStatusesKey = (filters: Record<Filters, string[]>, page: number) => {
    const serversKey = getServersKey(filters, page)
    return [...serversKey, "statuses"]
}