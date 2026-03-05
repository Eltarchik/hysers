import { axiosCommon } from "@/shared/api/interceptors"
import { AccessToken } from "@/shared/service/accessToken"

interface RegisterDTO {
    name: string
    email: string
    password: string
}

interface LoginDTO {
    email: string
    password: string
}

export class AuthAPI {
    private static BASE_URL = "/auth"

    static register = async (data: RegisterDTO) => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/register`, data)
        if (resp.data.accessToken) AccessToken.save(resp.data.accessToken)
        return resp.data
    }

    static login = async (data: LoginDTO) => {
        const resp = await axiosCommon.post(`${ this.BASE_URL }/login`, data)
        if (resp.data.accessToken) AccessToken.save(resp.data.accessToken)
        return resp.data
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