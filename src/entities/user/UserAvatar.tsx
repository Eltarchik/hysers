import { User } from "@/entities/user/types"
import Image from "next/image"
import { Heading } from "@/shared/ui/Heading"
import { use } from "react"

interface Props {
    user: User
}

export const UserAvatar = (
    { user }: Props
) => {
    if (user.avatar)
        return <Image className="size-12 rounded-full"
                      src={user.avatar}
                      alt={"avatar"}
                      width={48}
                      height={48}
    />

    return <div className="flex justify-center items-center size-12 rounded-full bg-glade">
        <Heading size="sm" className="text-accent-element">
            { user.name.at(0)?.toUpperCase() || "$" }
        </Heading>
    </div>
}