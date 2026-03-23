import { PopupListItem } from "@/shared/ui/PopupList"
import { LogOut } from "lucide-react"

export enum UserMenuAction {
    LOGOUT
}

export const userMenuConfig: PopupListItem<UserMenuAction>[] = [
    {
        title: "logout",
        value: UserMenuAction.LOGOUT,
        icon: LogOut
    }
]