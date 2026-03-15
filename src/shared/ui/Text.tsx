import { ReactNode } from "react"
import { cn } from "@/shared/lib/cn";
import { ChildrenProp, ClassProp } from "@/shared/ui/propsPresets"


type Props = {
    bold?: boolean
    small?: boolean
} & ClassProp & ChildrenProp

export const Text = (
    { bold, small, className, children }: Props
) => {
    return <p className={cn(
                    "text-element",
                    bold ? "font-semibold" : "font-medium",
                    small ? "text-sm" : "text-xl",
                    "transition-colors duration-200 ease-in",
                    className
              )}
    >
        { children }
    </p>
}