import { ServerOwnerCard } from "@/entities/server/ui/serverPageCards/ServerOwnerCard"
import { ServerContactsCard } from "@/entities/server/ui/serverPageCards/ServerContactsCard"
import { User } from "@/entities/user/types"
import { ClassProp } from "@/shared/ui/propsPresets"
import { cn } from "@/shared/lib/cn"

type Props = {
    user: User
} & ClassProp

export const ServerTeamBlock = (
    { user, className }: Props // todo add real ownerNotConfirmed
) => {
    return <div className={cn("flex flex-col gap-5", className)}>
        <ServerOwnerCard user={user} ownerNotConfirmed={true} />
        <ServerContactsCard />
    </div>
}