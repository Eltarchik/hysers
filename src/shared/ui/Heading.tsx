import { ReactNode } from "react"
import { cn } from "@/shared/lib/cn"
import { ChildrenProp, ClassProp } from "@/shared/ui/propsPresets"

type Props = {
    size?: "sm" | "md" | "lg"
} & ClassProp & ChildrenProp

export const Heading = (
    { size = "sm", className, children }: Props
) => {
    if (size === "lg") {
        return <h1 className={cn(
                        "text-element-imp text-4xl font-bold",
                        "transition-colors duration-200 ease-in",
                        className
                    )}
        >
            { children }
        </h1>
    }

    if (size === "md") {
        return <h2 className={cn(
                        "text-element-imp text-3xl font-bold",
                        "transition-colors duration-200 ease-in",
                        className
                    )}
        >
            { children }
        </h2>
    }

    return <h3 className={cn(
                    "text-element-imp text-2xl font-bold",
                    "transition-colors duration-200 ease-in",
                    className
                )}
    >
        { children }
    </h3>
}