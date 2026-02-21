export const LIGHT_THEME = "light"

export const toggleTheme = () => {
    document.documentElement.classList.toggle(LIGHT_THEME)
}