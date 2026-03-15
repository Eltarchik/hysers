import { ChildrenProp } from "@/shared/ui/propsPresets"
import { repeat } from "@/shared/lib/iterators"

type Props = {
    count?: number
} & ChildrenProp

export const ServerCardSkeleton = (
    { count = 1, children }: Props
) => {

    return repeat(count).map(i => <div key={i} className="flex flex-col overflow-hidden rounded-2xl bg-island">
        <div className="w-full h-40 bg-glade" />
        <div className="relative flex flex-col h-43 p-5 w-full">
            { children }
        </div>
    </div>
    )
}