import Cookies from "js-cookie"



export class AccessToken {
    static KEY = "access-token"

    static get = () => {
        return Cookies.get(this.KEY) || undefined
    }

    static save = (token: string) => {
        Cookies.set(this.KEY, token, {
            domain: "localhost",
            sameSite: "strict",
            expires: 1,
        })
    }

    static remove = () => {
        Cookies.remove(this.KEY)
    }
}