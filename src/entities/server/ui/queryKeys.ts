import { useSelector } from "react-redux"
import { RootState } from "@/shared/config/store"

export const useServersKey = () => {
    const filters = useSelector((state: RootState)=> state.filters.selected)
    return ["servers", filters]
}

export const useServerStatusesKey = () => {
    const serversKey = useServersKey()
    return [...serversKey, "statuses"]
}