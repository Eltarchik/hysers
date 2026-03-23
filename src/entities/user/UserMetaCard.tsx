import { User } from "@/entities/user/types"
import { UserAvatar } from "@/entities/user/UserAvatar"
import { Text } from "@/shared/ui/Text"
import { ClassProp } from "@/shared/ui/propsPresets"
import { cn } from "@/shared/lib/cn"
import { MouseEventHandler } from "react"


type Props = {
    user: User
    onClick?: MouseEventHandler<HTMLButtonElement>
} & ClassProp

export const UserMetaCard = (
    { user, className, onClick }: Props
) => {
    return <div className={cn("flex items-center gap-2", className)}>
        <Text bold>{ user.name }</Text>
        <button className="flex rounded-full cursor-pointer" onClick={onClick}>
            <UserAvatar user={user} />
        </button>
    </div>
}