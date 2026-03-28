import { axiosCommon } from "@/shared/api/interceptors"
import { AccessToken } from "@/shared/service/accessToken"
import { z } from "zod"
import { createApiResponseSchema } from "@/shared/api/responseSchemas"
import { LoginDTO, RegisterDTO } from "@/entities/auth/types"

class AuthAPI {
    private BASE_URL = "/auth"

    private authSchema = createApiResponseSchema(
        z.object({
            accessToken: z.string(),
        })
    )

    private initRegisterSchema = createApiResponseSchema(z.undefined())
    initRegister = async (data: RegisterDTO) => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/init-register`, data)
        const parsed = this.initRegisterSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        return parsed.data
    }

    register = async (code: string) => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/register`, undefined, {
            params: { code }
        })
        const parsed = this.authSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        if (parsed.data.status === "success") AccessToken.save(parsed.data.data.accessToken)

        return parsed.data
    }

    login = async (data: LoginDTO) => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/login`, data)
        const parsed = this.authSchema.safeParse(resp.data)
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
        const parsed = this.authSchema.safeParse(resp.data)
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