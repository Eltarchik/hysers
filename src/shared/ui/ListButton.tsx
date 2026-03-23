import { ChildrenProp, ClassProp } from "@/shared/ui/propsPresets"
import { MouseEventHandler } from "react"
import { cn } from "@/shared/lib/cn"

type Props = {
    onClick?: MouseEventHandler<HTMLButtonElement>,
} & ClassProp & ChildrenProp

export const ListButton = (
    { className, children, onClick }: Props
) => {
    return <button className={cn(
                        "flex items-center gap-2 px-5 h-10 rounded-lg cursor-pointer",
                        "transition-colors duration-200 ease-in",
                        className
                   )}
                   onClick={onClick}
    >
        { children }
    </button>
}