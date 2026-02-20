import { MouseEventHandler, ReactNode, useMemo, useRef } from "react"
import { Heading } from "@/shared/ui/Heading"
import { ChevronDown } from "lucide-react"
import { cn } from "@/shared/lib/cn"
import { useMounted } from "@/shared/hooks/useMounted"


interface Props {
    title: string
    children?: ReactNode
    opened?: boolean
    onOpeningSwitch?: MouseEventHandler<HTMLButtonElement>
}

export const FilterCard = ({
    title,
    children,
    opened,
    onOpeningSwitch
}: Props) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const mounted = useMounted()

    const cardHeight = useMemo(() => {
        const closedHeight = 64
        if (!mounted || !contentRef.current) return closedHeight

        const openedHeight = contentRef.current.clientHeight + closedHeight + 20

        return (opened || opened === undefined) ? openedHeight : closedHeight
    }, [opened, children, mounted])

    return <div className={cn(
                    "flex flex-col gap-5 p-5 w-full rounded-2xl bg-island overflow-hidden",
                    "transition-[height] duration-100 ease-in",
                )}
                style={{
                    height: mounted ? cardHeight : "fit-content"
                }}
    >
        <div className="flex items-center gap-2">
            { opened !== undefined &&
                <button className="size-6 cursor-pointer" onClick={onOpeningSwitch}>
                    <ChevronDown color="var(--element-sub)"
                                 className={cn(
                                     "transition-transform duration-80 ease-in",
                                     !opened ? "-rotate-90" : ""
                                 )}
                    />
                </button>
            }
            <Heading className="text-element-sub leading-6">{ title }</Heading>
        </div>
        <div className={cn(
                "transition-opacity duration-80 ease-in",
                !opened && "opacity-0"
             )}
             ref={contentRef}
        >
            { children }
        </div>
    </div>
}