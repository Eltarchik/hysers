import { axiosCommon } from "@/shared/api/interceptors"
import { AccessToken } from "@/shared/service/accessToken"
import { z } from "zod"

interface RegisterDTO {
    name: string
    email: string
    password: string
}

const authRequestSchema = z.object({
    accessToken: z.string(),
})

type AuthRequest = z.infer<typeof authRequestSchema>

interface LoginDTO {
    email: string
    password: string
}

export class AuthAPI {
    private static BASE_URL = "/auth"

    static register = async (data: RegisterDTO): Promise<AuthRequest> => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/register`, data)
        const parsed = authRequestSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        if (parsed.data.accessToken) AccessToken.save(parsed.data.accessToken)

        return parsed.data
    }

    static login = async (data: LoginDTO) => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/login`, data)
        const parsed = authRequestSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        if (parsed.data.accessToken) AccessToken.save(parsed.data.accessToken)

        return parsed.data
    }

    static discordLogin = async () => {
        const resp = await axiosCommon.get(`${ this.BASE_URL }/discord/login`)
        return resp.data
    }

    static refresh = async () => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/refresh`)
        if (resp.data.accessToken) AccessToken.save(resp.data.accessToken)
        return resp.data
    }

    static logout = async () => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/logout`)
        AccessToken.remove()
        return resp.data
    }
}