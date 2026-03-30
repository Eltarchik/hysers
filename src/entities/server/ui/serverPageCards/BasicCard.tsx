import { ChildrenProp, ClassProp } from "@/shared/ui/propsPresets"
import { cn } from "@/shared/lib/cn"


type Props = ClassProp & ChildrenProp

export const BasicCard = (
    { className, children }: Props
) => {
    return <div className={cn(
                    "flex flex-col gap-5 p-5 rounded-2xl bg-island",
                    className
                )}
    >
        { children }
    </div>
}