import { useCallback, useState } from "react"
import { useDebounce } from "@/shared/hooks/useDebounce"

export const useDebouncedValue = <T>(value: T, delay = 400) => {
    const [ debouncedValue, setDebouncedValue ] = useState(value)

    const updateValue = useCallback(
        () => setDebouncedValue(value),
        [setDebouncedValue]
    )
    useDebounce(updateValue, delay)

    return debouncedValue
}

