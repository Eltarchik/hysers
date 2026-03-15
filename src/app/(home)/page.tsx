'use client'

import { FiltersList } from "@/entities/filters/FiltersList"
import { ServersList } from "@/entities/server/ui/ServersList"

export default function Home() {

    return <div className="grid grid-cols-1 xl:grid-cols-[4fr_9fr_4fr] gap-10 max-w-440 w-full">
        <FiltersList className="hidden xl:flex" />
        <ServersList />
    </div>
}
