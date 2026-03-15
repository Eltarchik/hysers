'use client'

import { FiltersBlock } from "@/entities/filters/FiltersBlock"
import { ServerCards } from "@/wigets/ServerCards"

export default function Home() {

    return <div className="grid grid-cols-1 xl:grid-cols-[4fr_9fr_4fr] gap-10 max-w-440 w-full">
        <FiltersBlock className="hidden xl:flex" />
        <ServerCards />
    </div>
}
