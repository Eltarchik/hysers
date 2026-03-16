import { User } from "@/entities/user/types"
import { UserAvatar } from "@/entities/user/UserAvatar"
import { Text } from "@/shared/ui/Text"
import { ClassProp } from "@/shared/ui/propsPresets"
import { cn } from "@/shared/lib/cn"


type Props = {
    user: User
} & ClassProp

export const UserMetaCard = (
    { user, className }: Props
) => {
    return <div className={cn("flex items-center gap-2", className)}>
        <Text bold>{ user.name }</Text>
        <button className="flex rounded-full cursor-pointer">
            <UserAvatar user={user} />
        </button>
    </div>
}