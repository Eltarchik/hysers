export class Routes {
    static HOME = "/"
    static LOGIN = "/login"
    static REGISTER = "/register"
    static REGISTER_CODE = "/register/code"
    static PROFILE = "/profile"
    static SERVER = (id: string) => `/server/${id}`
}