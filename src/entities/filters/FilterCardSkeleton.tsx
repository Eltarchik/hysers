import { cn } from "@/shared/lib/cn"
import { repeat } from "@/shared/lib/iterators"
import { ClassProp } from "@/shared/ui/propsPresets"

type Props = {
    count?: number
} & ClassProp

export const FilterCardSkeleton = (
    { count = 1, className }: Props
) => {
    return repeat(count).map(i =>
        <div key={i} className={cn(
                "flex flex-col gap-5 p-5 w-full h-50 rounded-2xl bg-island overflow-hidden",
                className
            )}
        />
    )
}