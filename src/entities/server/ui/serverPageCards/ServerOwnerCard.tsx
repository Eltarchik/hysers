'use client'

import { User } from "@/entities/user/types"
import { BasicCard } from "@/entities/server/ui/serverPageCards/BasicCard"
import { UserAvatar } from "@/entities/user/UserAvatar"
import { Heading } from "@/shared/ui/Heading"
import { Button } from "@/shared/ui/Button"
import { Text } from "@/shared/ui/Text"
import { Check } from "lucide-react"


interface Props {
    user: User
    ownerNotConfirmed?: boolean
}

export const ServerOwnerCard = (
    { user, ownerNotConfirmed = false }: Props
) => {
    const declareRights = () => {
        // todo add api integration
    }

    return <BasicCard>
        <div className="flex gap-2 items-center">
            <Heading className="text-element-sub">Владелец</Heading>
            { !ownerNotConfirmed &&
                <div className="flex items-center justify-center size-6 rounded-full bg-accent-island">
                    <Check size={ 16 } strokeWidth={ 3 } color="var(--accent-element)"/>
                </div>
            }
        </div>
        <div className="flex gap-4 items-center">
            <UserAvatar user={user} />
            <Heading>{ user.name }</Heading>
        </div>
        { ownerNotConfirmed &&
            <Button className="bg-glade"
                    onClick={declareRights}
            >
                <Text>Заявить права</Text>
            </Button>
        }
    </BasicCard>
}