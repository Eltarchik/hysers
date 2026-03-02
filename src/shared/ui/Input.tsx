'use client'

import { InputHTMLAttributes, ReactNode, RefObject, useRef } from "react"
import { cn } from "@/shared/lib/cn"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    inputClassName?: string
    children?: ReactNode
    ref?: RefObject<HTMLInputElement | null>
}

export const Input = ({
    className,
    inputClassName,
    children,
    ref = useRef(null),
    ...rest
}: Props) => {
    return (
        <label className={cn(
                            "flex items-center gap-2 px-5 h-12 w-full rounded-2xl bg-island cursor-text",
                            className
                         )}
               onMouseDown={() => ref?.current?.focus()}
        >
            <input className={cn("flex w-full text-xl font-medium text-element-imp", inputClassName)}
                   ref={ref}
                   {...rest}
            />
            { children }
        </label>
    )
}
