'use client'

import { useRef, useState } from "react"
import { repeat } from "@/shared/lib/iterators"
import { Text } from "@/shared/ui/Text"
import { cn } from "@/shared/lib/cn"


interface Props {
    error?: boolean
    onCodeEntered: (code: string) => void
}

export const VerificationCodeInput = (
    { error = false, onCodeEntered }: Props
) => {
    const [ codeValue, setCodeValue ] = useState("")
    const [ overtimeCodeValue, setOvertimeCodeValue ] = useState("")

    const overtimeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const updateOvertimeCodeValue = (prev: string, next: string) => {
        if (next.length < prev.length) {
            overtimeTimeoutRef.current = setTimeout(() => {
                if (overtimeTimeoutRef.current) setOvertimeCodeValue(next)
            }, 200)
            return
        }

        setOvertimeCodeValue(next)
        if (overtimeTimeoutRef.current === null) return

        clearTimeout(overtimeTimeoutRef.current)
        overtimeTimeoutRef.current = null
    }

    return <label className="flex gap-2 px-5 h-15 rounded-2xl bg-glade cursor-text">
        <input className="size-0 opacity-0"
               value={codeValue}
               onChange={e => {
                   setCodeValue(prev => {
                       const next = e.target.value
                           .replace(/\D/g, "")
                           .slice(0, 6)

                       updateOvertimeCodeValue(prev, next)
                       if (next.length === 6 && next !== prev) onCodeEntered(next)
                       return next
                   })
               }}
               onKeyDown={e => {
                   if (e.key === "ArrowLeft" || e.key === "ArrowRight") e.preventDefault()
               }}
               name="code"
        />
        { repeat(6).map(i =>
            <div key={i} className="flex flex-col items-center w-5 h-full overflow-hidden">
                <div className={cn(
                        "flex justify-center items-center min-h-15",
                        "transition-[margin] duration-200 ease-in",
                        codeValue[i] && "-mt-15"
                     )}
                >
                    <div className={cn(
                            "size-2 rounded-full bg-element-dis",
                            "transition-opacity duration-200 ease-in",
                            codeValue[i] && "opacity-0",
                         )}
                    />
                </div>
                <Text bold className={cn(
                                "flex items-center min-h-15 text-element-imp opacity-0",
                                "transition-[opacity,color] duration-200 ease-in",
                                codeValue[i] && "opacity-100",
                                error && codeValue.length === 6 && "text-red-element"
                           )}
                >
                    { overtimeCodeValue[i] }
                </Text>
            </div>
        )}
    </label>
}