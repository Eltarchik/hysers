export const setLang = async (locale: string) => {
    console.log(locale)
    await fetch("/api/locale", {
        method: "POST",
        body: JSON.stringify({ locale })
    })
}