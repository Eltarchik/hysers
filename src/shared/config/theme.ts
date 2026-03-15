export const LIGHT_THEME = "light"

let timeout: NodeJS.Timeout | null = null

export const toggleTheme = () => {
    document.documentElement.classList.add("theme-transition")
    document.documentElement.classList.toggle(LIGHT_THEME)

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
        document.documentElement.classList.remove("theme-transition")
    }, 80)
}