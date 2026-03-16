import { axiosCommon } from "@/shared/api/interceptors"
import { AccessToken } from "@/shared/service/accessToken"
import { z } from "zod"
import { createApiResponseSchema } from "@/shared/api/responseSchemas"

interface RegisterDTO {
    name: string
    email: string
    password: string
}

const authRequestSchema = createApiResponseSchema(
    z.object({
        accessToken: z.string(),
    })
)

type AuthRequest = z.infer<typeof authRequestSchema>

interface LoginDTO {
    email: string
    password: string
}

class AuthAPI {
    private BASE_URL = "/auth"

    register = async (data: RegisterDTO) => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/register`, data)
        const parsed = authRequestSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        if (parsed.data.status === "success") AccessToken.save(parsed.data.data.accessToken)

        return parsed.data
    }

    login = async (data: LoginDTO) => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/login`, data)
        const parsed = authRequestSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        if (parsed.data.status === "success") AccessToken.save(parsed.data.data.accessToken)

        return parsed.data
    }

    discordLogin = async () => {
        const resp = await axiosCommon.get(`${ this.BASE_URL }/discord/login`)
        return resp.data
    }

    refresh = async () => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/refresh`)
        const parsed = authRequestSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        if (parsed.data.status === "success") AccessToken.save(parsed.data.data.accessToken)
        return resp.data
    }

    logout = async () => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/logout`)
        AccessToken.remove()
        return resp.data
    }
}

export const authAPI = new AuthAPI()