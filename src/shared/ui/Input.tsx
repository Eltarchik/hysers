import { InputHTMLAttributes, ReactNode } from "react"
import { cn } from "@/shared/lib/cn"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    inputClassName?: string
    children?: ReactNode
}

export const Input = ({
    className,
    inputClassName,
    children,
    ...rest
}: Props) => {
    return (
        <label className={cn(
            "flex items-center gap-2 px-5 h-12 w-full rounded-2xl bg-island cursor-text",
            className
        )}>
            <input
                className={cn("flex w-full text-xl font-medium", inputClassName)}
                {...rest}
            />
            { children }
        </label>
    )
}
