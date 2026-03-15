'use client'

import { ChevronDown } from "lucide-react"
import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/shared/lib/cn"
import { useOverlay } from "@/shared/hooks/useOverlay"
import { Text } from "@/shared/ui/Text"
import { ClassProp } from "@/shared/ui/propsPresets"

export interface CheepSelectItem<T = string> {
    value: T
    title: string
}

interface ListDimensions {
    top: number
    left: number
    width: number
}

type Props<T> = {
    selectedItem: CheepSelectItem<T>
    items: CheepSelectItem<T>[]
    onSelect: (item: CheepSelectItem<T>) => void
} & ClassProp

export const CheepSelect = <T,>({
    selectedItem,
    items,
    className,
    onSelect,
}: Props<T>) => {
    const [ opened, setOpened, ref ] = useOverlay<HTMLDivElement>()
    const [ position, setPosition ] = useState<ListDimensions | null>(null)

    const listRef = useRef<HTMLDivElement>(null)

    const updatePosition = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            setPosition({
                top: rect.bottom,
                left: rect.left,
                width: rect.width
            })
        }
    }

    useEffect(() => {
        if (!opened) {
            setPosition(null)
            return
        }

        updatePosition()
        window.addEventListener("scroll", updatePosition, true)
        window.addEventListener("resize", updatePosition)

        return () => {
            window.removeEventListener("scroll", updatePosition, true)
            window.removeEventListener("resize", updatePosition)
        }
    }, [ opened ])

    return <div className={cn("relative flex flex-col", className)} ref={ref}>
        <button className="flex justify-between items-center px-5 h-10 w-full rounded-full bg-glade cursor-pointer"
                type="button"
                onClick={() => setOpened(prev => !prev)}
        >
            <Text>{ selectedItem.title }</Text>
            <ChevronDown className={cn(
                            "transition-transform duration-200 ease-in",
                            opened && "-rotate-180"
                         )}
            />
        </button>

        { opened && position && createPortal(
            <div className="z-20 absolute translate-y-2 flex flex-col p-2 rounded-2xl bg-glade shadow-2xl shadow-space"
                 ref={listRef}
                 style={{
                     top: position.top,
                     left: position.left,
                     width: position.width
                 }}
                 onMouseDown={event => event.stopPropagation()}
            >
                { items.map((item, i) =>
                    <button key={i}
                            className={cn(
                                "flex items-center px-3 h-10 w-full cursor-pointer rounded-lg",
                                "transition-colors duration-200 ease-in",
                                item.value === selectedItem.value && "bg-island"
                            )}
                            onClick={() => {
                                onSelect(item)
                                setOpened(false)
                            }}
                    >
                        <Text className={item.value === selectedItem.value ? "text-element-imp" : ""}>
                            { item.title }
                        </Text>
                    </button>
                )}
            </div>,
            document.body
        )}
    </div>
}
