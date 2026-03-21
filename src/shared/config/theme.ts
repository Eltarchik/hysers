export const LIGHT_THEME = "light"

let timeout: NodeJS.Timeout | null = null

export const enableThemeTogglingAnimation = () => {
    document.documentElement.classList.add("theme-transition")
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
        document.documentElement.classList.remove("theme-transition")
    }, 80)
}