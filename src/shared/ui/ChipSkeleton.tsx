import { ClassProp } from "@/shared/ui/propsPresets"
import { cn } from "@/shared/lib/cn"

type Props = ClassProp

export const ChipSkeleton = (
    { className }: Props
) => {
    return <div className={cn(
                    "flex items-center px-5 h-10 rounded-full bg-glade cursor-pointer",
                    className
                )}
    />
}