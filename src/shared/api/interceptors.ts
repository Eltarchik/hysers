import axios, { CreateAxiosDefaults } from "axios"
import { AccessToken } from "@/shared/service/accessToken"
import { errorMessage } from "@/shared/service/errors"
import { AuthAPI } from "@/shared/api/auth"

const options: CreateAxiosDefaults = {
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
}

const axiosCommon = axios.create(options)
const axiosAuthorized = axios.create(options)

axiosAuthorized.interceptors.request.use(config => {
    const accessToken = AccessToken.get()

    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

axiosAuthorized.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config

        if (
            (error?.response?.status === 401
            || errorMessage(error) === "jwt expected"
            || errorMessage(error) === "jwt must be provided")
            && error.config
            && !error.config._isRetry
        ) {
            originalRequest._isRetry = true

            try {
                await AuthAPI.refresh()
                return axiosAuthorized.request(originalRequest)

            } catch (error) {
                if (errorMessage(error) === "jwt expected"
                    || errorMessage(error) === "jwt must be provided"
                ) {
                    AccessToken.remove()
                }
            }
        }

        throw error
    }
)

export { axiosCommon, axiosAuthorized }
