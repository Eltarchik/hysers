import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

export const useSliceInit = <SliceState extends {}>(
    key: string,
    setter: (payload: SliceState) => {payload: SliceState, type: string},
    storage?: Storage,
) => {
    const dispatch = useDispatch()
    let [ loaded, setLoaded ] = useState(false)

    useEffect(() => {
        storage = storage ?? sessionStorage
        const saved = storage.getItem(key)

        if (saved) {
            try {
                const parsed = JSON.parse(saved) as SliceState
                // todo add zud validation
                dispatch(setter(parsed))
                setLoaded(true)
            } catch (e) {
                console.error('Failed to parse filters state from storage', e)
            }
        }
    }, [dispatch])

    return loaded
}