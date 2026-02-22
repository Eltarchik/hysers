'use client'

import { FilterCard } from "@/entities/filters/FilterCard"
import { ToggleChip } from "@/shared/ui/ToggleChip"
import { titleCase } from "@/shared/lib/textFormatting"
import { useTranslations } from "next-intl"
import { useSelector } from "react-redux"
import { RootState } from "@/shared/config/store"
import { filters } from "@/entities/filters/config/filters"
import { useFiltersInit, useFiltersSlice } from "@/entities/filters/slices/filters.slice"
import { SortCard } from "@/entities/filters/SortCard"
import { useSortInit } from "@/entities/filters/slices/sort.slice"

export const FiltersBlock = () => {
    const t = useTranslations("Entities.Filters")

    const filtersLoaded = useFiltersInit()
    const sortLoaded = useSortInit()

    const selectedFilters = useSelector((state: RootState) => state.filters.selected)
    const closedFilters = useSelector((state: RootState) => state.filters.closed)
    const { toggleSelecting, toggleOpening } = useFiltersSlice()

    // todo add skeleton when cached values loading

    return <div className="flex flex-col gap-5 w-full">
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
                        </ToggleChip>,
                    ) }
                </div>
            </FilterCard>
        )}
    </div>
}