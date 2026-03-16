import { axiosAuthorized } from "@/shared/api/interceptors"
import { userSchema } from "@/entities/user/types"
import { createApiResponseSchema } from "@/shared/api/responseSchemas"

const respUserSchema = createApiResponseSchema(userSchema)

class UserAPI {
    private BASE_URL = "/user"

    meta = async () => {
        const resp = await axiosAuthorized.get(this.BASE_URL)
        const parsed = respUserSchema.safeParse(resp.data)
        if (!parsed.success) throw parsed.error

        return parsed.data
    }
}

export const userAPI = new UserAPI()
