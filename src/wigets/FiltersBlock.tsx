'use client'

import { FilterCard } from "@/entities/filters/FilterCard"
import { ToggleChip } from "@/shared/ui/ToggleChip"
import { titleCase } from "@/shared/lib/textFormatting"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowDown, ChevronDown } from "lucide-react"
import { Text } from "@/shared/ui/Text"
import { useSelector } from "react-redux"
import { RootState } from "@/shared/config/store"
import { filters } from "@/entities/filters/config/filters"
import { useFiltersMutation } from "@/entities/filters/filters.slice"

export const FiltersBlock = () => {
    const t = (space: string, name: string) => useTranslations(`Entities.Filters.${space}`)(name)

    const selectedFilters = useSelector((state: RootState) => state.filters.selected)
    const closedFilters = useSelector((state: RootState) => state.filters.closed)
    const { toggleSelecting, toggleOpening } = useFiltersMutation()

    return <div className="flex flex-col gap-5 w-full">
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
        <FilterCard title={t("sort", "title")}
                    opened={true}
        >
            <div className="flex gap-3">
                <button className="flex justify-center items-center size-10 rounded-full bg-glade cursor-pointer">
                    <ArrowDown />
                </button>
                <button className="flex justify-between items-center px-5 h-10 flex-1 rounded-full bg-glade cursor-pointer">
                    <Text>Online</Text>
                    <ChevronDown />
                </button>
            </div>
        </FilterCard>
    </div>
}