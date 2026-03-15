export const range = (from: number, to: number) => {
    return Array.from({ length: to - from + 1 }, (_, i) => i + from)
}

export const repeat = (count: number) => {
    return range(0, count - 1)
}