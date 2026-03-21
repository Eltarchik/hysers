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
    onChangeOpened?: (opened: boolean) => void
} & ClassProp

export const CheepSelect = <T,>({
    selectedItem,
    items,
    className,
    onSelect,
    onChangeOpened
}: Props<T>) => {
    const listRef = useRef<HTMLDivElement>(null)
    const [ opened, setOpened, ref ] = useOverlay<HTMLDivElement>()

    useEffect(() => {
        onChangeOpened?.(opened)
    }, [opened, onChangeOpened])

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

        { opened &&
            <div className="z-20 absolute top-full translate-y-2 flex flex-col p-2 w-full rounded-2xl bg-glade shadow-2xl shadow-space"
                 ref={listRef}
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
            </div>
        }
    </div>
}
