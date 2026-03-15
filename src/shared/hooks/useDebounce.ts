import { useEffect, useState } from 'react'

export const useDebounce = (callback: () => void, delay = 400) => {
    useEffect(() => {
        const updater = setTimeout(() => {
            callback()
        }, delay)

        return () => clearTimeout(updater)
    }, [callback, delay])
}

