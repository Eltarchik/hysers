import { MouseEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { Heading } from "@/shared/ui/Heading"
import { ChevronDown } from "lucide-react"
import { cn } from "@/shared/lib/cn"
import { useMounted } from "@/shared/hooks/useMounted"
import { useOvertimeValue } from "@/shared/hooks/useOvertimeValue"
import { ChildrenProp } from "@/shared/ui/propsPresets"


type Props = {
    title: string
    opened?: boolean
    onOpeningSwitch?: MouseEventHandler<HTMLButtonElement>
    clipContent?: boolean
} & ChildrenProp

const CLOSED_HEIGHT = 64

export const FilterCard = ({
    title,
    children,
    opened,
    onOpeningSwitch,
    clipContent = true,
}: Props) => {
    const [ openedCardHeight, setOpenedCardHeight ] = useState<number | undefined>()
    const overtimeOpened = useOvertimeValue(opened, 80)

    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!contentRef.current || !overtimeOpened) return

        const observer = new ResizeObserver(entries => {
            setOpenedCardHeight(entries[0].target.clientHeight + CLOSED_HEIGHT + 20)
        })
        observer.observe(contentRef.current)

        return () => observer.disconnect()
    }, [])

    return <div className={cn(
                    "flex flex-col gap-5 p-5 w-full rounded-2xl bg-island",
                    "transition-[height] duration-100 ease-in",
                    clipContent && "overflow-hidden"
                )}
                style={{
                    height: opened ? openedCardHeight ?? "fit-content" : CLOSED_HEIGHT
                }}
    >
        <button className="flex items-center gap-2 h-6 cursor-pointer"
                disabled={opened === undefined}
                onClick={onOpeningSwitch}
        >
            { opened !== undefined &&
                <ChevronDown color="var(--element-sub)"
                             className={cn(
                                 "transition-transform duration-80 ease-in",
                                 !opened ? "-rotate-90" : ""
                             )}
                />
            }
            <Heading className="text-element-sub leading-6">{ title }</Heading>
        </button>
        <div className={cn(
                "transition-opacity duration-80 ease-in",
                !opened && "opacity-0"
             )}
             ref={contentRef}
        >
            { overtimeOpened && children }
        </div>
    </div>
}