import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 400) => {
  const [ debouncedValue, setDebouncedValue ] = useState(value)

  useEffect(() => {
    const updater = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(updater)
  }, [value, delay])

  return debouncedValue
}

