import { Header } from "@/wigets/Header"
import { ReactNode } from "react"
import { ChildrenProp } from "@/shared/ui/propsPresets"

type Props = ChildrenProp

export default async function Layout(
    { children, }: Props
) {
    return <>
        <Header />
        { children }
    </>
}
