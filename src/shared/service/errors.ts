export const errorMessage = (error: any): string => {
    const msg = error?.response?.data?.message

    if (msg) return typeof error?.response?.data?.message === "object"
        ? msg[0]
        : msg

    return error.message || ""
}