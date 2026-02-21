'use client'

import { FiltersBlock } from "@/wigets/FiltersBlock"

export default function Home() {

    return <div className="grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_2fr_1fr] gap-10 max-w-440 w-full">
        <FiltersBlock />
    </div>
}
