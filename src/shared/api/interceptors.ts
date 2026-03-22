import axios, { CreateAxiosDefaults } from "axios"
import { AccessToken } from "@/shared/service/accessToken"
import { errorMessage } from "@/shared/service/errors"
import { authAPI } from "@/shared/api/auth"
import { badResponseSchema, errorHandler } from "@/shared/api/responseSchemas"

const options: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
}

const axiosCommon = axios.create(options)
const axiosAuthorized = axios.create(options)

axiosCommon.interceptors.response.use(
    config => config,
    async error => Promise.reject(errorHandler(error) ?? error)
)

axiosAuthorized.interceptors.response.use(
    config => config,
    async error => Promise.reject(errorHandler(error) ?? error)
)

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

        if ((error?.response?.status === 401
            || errorMessage(error) === "Unauthorized")
            && error.config
            && !error.config._isRetry
        ) {
            originalRequest._isRetry = true

            try {
                await authAPI.refresh()
                return axiosAuthorized.request(originalRequest)

            } catch (error) {
                if (errorMessage(error) === "Unauthorized") {
                    AccessToken.remove()
                }
            }
        }

        throw error
    }
)

export { axiosCommon, axiosAuthorized }
