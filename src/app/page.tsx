'use client'

import { FilterCard } from "@/entities/filters/FilterCard"
import { useState } from "react"
import { SmallChip } from "@/shared/ui/ToggleChip"
import { filters } from "@/entities/filters/config/filters"
import { useTranslations } from "next-intl"

export default function Home() {
    const [ o, setO ] = useState(true)
    const t = (space: string, name: string) => useTranslations(`Entities.Filters.${space}`)(name)

    return <div className="grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_2fr_1fr] gap-10 max-w-440 w-full">
        <div className="flex flex-col gap-5 w-full">
            { filters.map(filter =>
                <FilterCard key={filter.name}
                            title={t(filter.name, "title")}
                            opened={o}
                            onOpeningSwitch={() => setO(!o)}
                >
                    <div className="flex gap-3 flex-wrap">
                        { filter.items.map(item =>
                            <SmallChip key={item.name}>{ t(filter.name, item.name) }</SmallChip>
                        )}
                    </div>
                </FilterCard>
            ) }

        </div>
    </div>
}
