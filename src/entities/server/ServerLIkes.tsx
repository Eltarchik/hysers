import { cn } from "@/shared/lib/cn"
import { ClassProp } from "@/shared/ui/propsPresets"
import { Text } from "@/shared/ui/Text"
import { Heart } from "lucide-react"
import { MouseEventHandler } from "react"


type Props = {
    likes: number
    liked: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
} & ClassProp

export const ServerLikes = (
    { likes, liked, className, onClick }: Props
) => {
    return <button className={ cn(
                        "flex items-center gap-2 px-3 h-10 rounded-full cursor-pointer",
                        liked ? "bg-red-island" : "bg-glade",
                        className
                   )}
                   onClick={onClick}
    >
        <Text small bold className={ liked ? "text-red-element" : "" }>
            { likes }
        </Text>
        <Heart color={ liked ? "var(--red-element)" : "var(--element)" }
               fill={ liked ? "var(--red-element)" : "transparent" }
               className="transition-colors duration-200 ease-in"
        />
    </button>
}