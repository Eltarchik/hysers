import { serverSchema, serverStatusSchema } from "@/entities/server/types"
import { TagFilters } from "@/entities/filters/config/tags"
import { RegionFilters } from "@/entities/filters/config/regions"
import { axiosAuthorized } from "@/shared/api/interceptors"
import { createApiResponseSchema } from "@/shared/api/responseSchemas"
import { z } from "zod"

interface FiltersDto {
    tags?: TagFilters[]
    region?: RegionFilters // todo change to array
}

type SortType = "asc" | "desc"

interface OrderDto {
    likes?: SortType
    createdAt?: SortType
}

interface ServersDTO {
    page: number
    quantity: number
    filters?: FiltersDto
    order?: OrderDto
}

export const SERVERS_IN_PAGE = 24

class ServerAPI {
    private BASE_URL = "/server"

    private serversSchema = createApiResponseSchema(serverSchema.array().nullish())
    servers = async (data: ServersDTO) => {
        const resp = await axiosAuthorized.post(this.BASE_URL, data)
        const parsed = this.serversSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        return parsed.data
    }

    private serverSchema = createApiResponseSchema(serverSchema)
    server = async (nameId: string) => {
        const resp = await axiosAuthorized.get(`${this.BASE_URL}/id/${nameId}`)
        const parsed = this.serverSchema.safeParse(resp.data)

        if (!parsed.success) throw parsed.error

        return parsed.data
    }

    private quantitySchema = createApiResponseSchema(z.number().min(0))
    quantity = async () => {
        const resp = await axiosAuthorized.get(`${this.BASE_URL}/quantity`)
        const parsed = this.quantitySchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        return parsed.data
    }

    private statusSchema = createApiResponseSchema(serverStatusSchema)
    status = async (id: number) => {
        const resp = await axiosAuthorized.get(`${this.BASE_URL}/status`, {
            params: { id }
        })
        const parsed = this.statusSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        return parsed.data
    }

    private statusesSchema = createApiResponseSchema(serverStatusSchema.array())
    statuses = async (ids: number[]) => {
        const resp = await axiosAuthorized.get(`${this.BASE_URL}/statuses`, {
            params: { ids: ids.join(",") }
        })
        const parsed = this.statusesSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        return parsed.data
    }

    private respLikeSchema = createApiResponseSchema(z.undefined())
    like = async (id: number) => {
        const resp = await axiosAuthorized.post(`${this.BASE_URL}/like`, undefined, {
            params: { id }
        })
        const parsed = this.respLikeSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        return parsed.data
    }
}

export const serverAPI = new ServerAPI()