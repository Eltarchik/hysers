import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"
import { ClassProp } from "@/shared/ui/propsPresets"
import { cn } from "@/shared/lib/cn"


export interface PopupListItem<T> {
    title: string
    value: T
    icon: LucideIcon

}

type Props<T> = {
    items: PopupListItem<T>[]
    renderItem: (item: T) => ReactNode
} & ClassProp

export const PopupList = <T,>({
    items,
    renderItem,
    className,
}: Props<T>) => {
    return <div className={cn("flex flex-col p-2 w-full rounded-2xl bg-island", className)}>

    </div>
}