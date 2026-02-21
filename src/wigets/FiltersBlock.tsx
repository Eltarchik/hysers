'use client'

import { FilterCard } from "@/entities/filters/FilterCard"
import { ToggleChip } from "@/shared/ui/ToggleChip"
import { titleCase } from "@/shared/lib/textFormatting"
import { useTranslations } from "next-intl"
import { useSelector } from "react-redux"
import { RootState } from "@/shared/config/store"
import { filters } from "@/entities/filters/config/filters"
import { useFiltersMutation } from "@/entities/filters/slices/filters.slice"
import { SortCard } from "@/entities/filters/SortCard"

export const FiltersBlock = () => {
    const t = (space: string, name: string) => useTranslations(`Entities.Filters.${space}`)(name)

    const selectedFilters = useSelector((state: RootState) => state.filters.selected)
    const closedFilters = useSelector((state: RootState) => state.filters.closed)
    const { toggleSelecting, toggleOpening } = useFiltersMutation()

    return <div className="flex flex-col gap-5 w-full">
        <SortCard />
        { filters.map(filter =>
            <FilterCard key={filter.name}
                        title={t(filter.name, "title")}
                        opened={!closedFilters.includes(filter.name)}
                        onOpeningSwitch={() => toggleOpening(filter.name)}
            >
                <div className="flex gap-3 flex-wrap">
                    { filter.items.map(item =>
                        <ToggleChip key={item.name}
                                    selected={selectedFilters[filter.name].includes(item.name)}
                                    onToggle={() => toggleSelecting(filter.name, item.name)}
                        >
                            { titleCase(t(filter.name, item.name)) }
                        </ToggleChip>,
                    ) }
                </div>
            </FilterCard>
        )}
    </div>
}