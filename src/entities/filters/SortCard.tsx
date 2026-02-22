'use client'

import { ArrowDown } from "lucide-react"
import { FilterCard } from "@/entities/filters/FilterCard"
import { useTranslations } from "next-intl"
import { useSortMutation } from "@/entities/filters/slices/sort.slice"
import { RootState } from "@/shared/config/store"
import { useSelector } from "react-redux"
import { cn } from "@/shared/lib/cn"
import { SortCriteria, SortDirection } from "@/entities/filters/types"
import { CheepSelect, CheepSelectItem } from "@/shared/ui/CheepSelect"

export const SortCard = () => {
    const t = useTranslations(`Entities.Filters.sort`)

    const { closed, direction, criteria } = useSelector((state: RootState) => state.sort)
    const { select, toggleDirection, toggleOpening } = useSortMutation()

    const options: CheepSelectItem<SortCriteria>[] = Object.values(SortCriteria).map(cr => ({
        value: cr,
        title: t(cr)
    }))

    return <FilterCard title={t("title")}
                       opened={!closed}
                       onOpeningSwitch={toggleOpening}
    >
        <div className="flex gap-3">
            <button className="flex justify-center items-center size-10 rounded-full bg-glade cursor-pointer"
                    onClick={toggleDirection}
            >
                <ArrowDown className={cn(
                                "transition-transform duration-80 ease-in",
                                direction === SortDirection.UP && "rotate-180"
                           )}
                />
            </button>
            <CheepSelect className="flex-1"
                         selectedItem={{ value: criteria, title: t(criteria) }}
                         items={options}
                         onSelect={item => select(item.value)}
            />
        </div>
    </FilterCard>
}