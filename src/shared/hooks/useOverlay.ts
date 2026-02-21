import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react"

export const useOverlay = <T extends HTMLElement>(initialValue?: boolean): [
    boolean,
    d: Dispatch<SetStateAction<boolean>>,
    RefObject<T | null>
] => {
    const [ opened, setOpened ] = useState(!!initialValue)
    const parentRef = useRef<T>(null)

    useEffect(() => {
        const onPress = (event: MouseEvent) => {
            if (parentRef.current && !parentRef.current.contains(event.target as Node)) {
                setOpened(false)
            }
        }

        document.addEventListener("mousedown", onPress)

        return () => document.removeEventListener("mousedown", onPress)
    }, [])

    return [ opened, setOpened, parentRef ]
}