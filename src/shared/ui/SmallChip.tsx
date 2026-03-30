import { ReactNode } from "react"
import { Text } from "@/shared/ui/Text"
import { cn } from "@/shared/lib/cn"
import { ChildrenProp, ClassProp } from "@/shared/ui/propsPresets"


type Props = {
    colors?: "basic" | "accent" | "gold"
    textClassName?: string
} & ClassProp & ChildrenProp

export const SmallChip = (
    { colors = "basic", className, textClassName, children }: Props
) => {
    let bgColor = "bg-glade"
    if (colors === "accent") bgColor = "bg-accent-island"
    else if (colors === "gold") bgColor = "bg-gold-island"

    let textColor = "text-element"
    if (colors === "accent") textColor = "text-accent-element"
    else if (colors === "gold") textColor = "text-gold-element"

    return <span className={cn("flex items-center px-3 h-6 rounded-full", bgColor, className)}>
        <Text small className={cn("text-nowrap", textColor, textClassName)}>{ children }</Text>
    </span>
}