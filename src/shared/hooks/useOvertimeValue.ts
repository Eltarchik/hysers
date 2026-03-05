import { useEffect, useEffectEvent, useRef, useState } from "react"

export const useOvertimeValue = <T>(
    value: T,
    delay = 200,
    isKilled: (v: T) => boolean = (v) => !v
) => {
    const [ overtimeValue, setOvertimeValue ] = useState(value)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleUpdate = useEffectEvent((nextValue: T) => {
        console.log(isKilled(overtimeValue))

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        if (!isKilled(nextValue) || isKilled(overtimeValue)) {
            setOvertimeValue(nextValue)
            return
        }

        timeoutRef.current = setTimeout(() => {
            setOvertimeValue(nextValue)
            timeoutRef.current = null
        }, delay)
    })

    useEffect(() => {
        handleUpdate(value)
    }, [value])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return overtimeValue
}