'use client'

import { forwardRef, InputHTMLAttributes, ReactNode, RefObject, useRef } from "react"
import { cn } from "@/shared/lib/cn"
import { Text } from "@/shared/ui/Text"
import { useOvertimeValue } from "@/shared/hooks/useOvertimeValue"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    inputClassName?: string
    containerClassName?: string
    errorMsg?: string
    children?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        inputClassName,
        containerClassName,
        errorMsg,
        children,
        ...rest
    }, ref) => {
        const overtimeErrorMsg = useOvertimeValue(errorMsg)

        return <div className={cn("flex flex-col group w-full", containerClassName)} data-error={!!errorMsg}>
            <label className={cn(
                                "flex items-center gap-2 px-5 h-12 rounded-2xl bg-island cursor-text",
                                className
                             )}
                   onMouseDown={event => {
                       event.preventDefault()
                       event.currentTarget.querySelector("input")?.focus()
                   }}
            >
                <input className={cn(
                            "flex w-full text-xl font-medium text-element-imp",
                            "group-data-[error=true]:text-red-element",
                            inputClassName
                       )}
                       ref={ref}
                       onMouseDown={event => event.stopPropagation()}
                       {...rest}
                />
                { children }
            </label>
            <Text small className={cn(
                    "text-red-element opacity-0 h-0 overflow-hidden transition-[height,opacity,margin]",
                            errorMsg && "opacity-100 h-5 mt-2"
                        )}
            >
                { overtimeErrorMsg }
            </Text>
        </div>
    }
)
