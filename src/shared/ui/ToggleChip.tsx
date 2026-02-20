import { MouseEventHandler, ReactNode } from "react"
import { Text } from "@/shared/ui/Text"
import { cn } from "@/shared/lib/cn"


interface Props {
    selected?: boolean
    className?: string
    children?: ReactNode
    onToggle?: MouseEventHandler<HTMLButtonElement>
}

export const SmallChip = ({
    selected = false,
    className,
    children,
    onToggle
}: Props) => {

    return <button className={cn(
                        "flex items-center px-5 h-10 rounded-full cursor-pointer",
                        selected ? "bg-accent-island" : "bg-glade",
                        "transition-colors duration-200 ease-in",
                        className
                   )}
                   onClick={onToggle}
    >
        <Text className={cn(
                        "text-nowrap",
                        selected ? "text-accent-element" : "text-element",
                        "transition-colors duration-200 ease-in",
              )}
        >
            { children }
        </Text>
    </button>
}