'use client'

import { FilterCard } from "@/entities/filters/FilterCard"
import { ToggleChip } from "@/shared/ui/ToggleChip"
import { titleCase } from "@/shared/lib/textFormatting"
import { useTranslations } from "next-intl"
import { useSelector } from "react-redux"
import { RootState } from "@/shared/config/store"
import { filters } from "@/entities/filters/config/filters"
import { useFiltersInit, useFiltersSlice } from "@/entities/filters/slices/filtersSlice"
import { SortCard } from "@/entities/filters/SortCard"
import { useSortInit } from "@/entities/filters/slices/sortSlice"
import { cn } from "@/shared/lib/cn"
import { ClassProp } from "@/shared/ui/propsPresets"
import { FilterCardSkeleton } from "@/entities/filters/FilterCardSkeleton"

type Props = ClassProp

export const FiltersList = ({ className }: Props) => {
    const t = useTranslations("Entities.Filters")

    const filtersLoaded = useFiltersInit()
    const sortLoaded = useSortInit()

    const selectedFilters = useSelector((state: RootState) => state.filters.selected)
    const closedFilters = useSelector((state: RootState) => state.filters.closed)
    const { toggleSelecting, toggleOpening } = useFiltersSlice()

    if (!filtersLoaded || !sortLoaded) return <div className={cn("flex flex-col gap-5 w-full", className)}>
        <FilterCardSkeleton className="h-31" />
        <FilterCardSkeleton count={2} className="h-57" />
    </div>

    return <div className={cn("flex flex-col gap-5 w-full", className)}>
        <SortCard />
        { filters.map(filter =>
            <FilterCard key={filter.name}
                        title={t(`${filter.name}.title`)}
                        opened={!closedFilters.includes(filter.name)}
                        onOpeningSwitch={() => toggleOpening(filter.name)}
            >
                <div className="flex gap-3 flex-wrap">
                    { filter.items.map(item =>
                        <ToggleChip key={item.name}
                                    selected={selectedFilters[filter.name].includes(item.name)}
                                    onToggle={() => toggleSelecting(filter.name, item.name)}
                        >
                            { titleCase(t(`${filter.name}.${item.name}`)) }
                        </ToggleChip>
                    ) }
                </div>
            </FilterCard>
        )}
    </div>
}