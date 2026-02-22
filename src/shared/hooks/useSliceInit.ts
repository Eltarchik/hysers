import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

export const useSliceInit = <SliceState extends {}>(
    key: string,
    setter: (payload: SliceState) => {payload: SliceState, type: string}
) => {
    const dispatch = useDispatch()
    let [ loaded, setLoaded ] = useState(false)

    useEffect(() => {
        const saved = sessionStorage.getItem(key)
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as SliceState
                dispatch(setter(parsed))
                setLoaded(true)
            } catch (e) {
                console.error('Failed to parse filters state from sessionStorage', e)
            }
        }
    }, [dispatch])

    return loaded
}