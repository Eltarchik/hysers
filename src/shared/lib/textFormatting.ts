export const titleCase = (text: string) => {
    const words = text.split(" ")
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}