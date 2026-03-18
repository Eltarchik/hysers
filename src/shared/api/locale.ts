export const setLang = async (locale: string) => {
    await fetch("/api/locale", {
        method: "POST",
        body: JSON.stringify({ locale })
    })
}