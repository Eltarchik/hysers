import { ClassProp } from "@/shared/ui/propsPresets"
import { BasicCard } from "@/entities/server/ui/serverPageCards/BasicCard"
import { TagFilters } from "@/entities/filters/config/tags"
import { Heading } from "@/shared/ui/Heading"
import { SmallChip } from "@/shared/ui/SmallChip"
import { Text } from "@/shared/ui/Text"


interface Props {
    number: number
    tag?: TagFilters
}

export const ServerRatingCard = (
    { number, tag }: Props
) => {
    return <BasicCard>
        <div className="flex gap-4 items-center">
            <Heading>№{ number }</Heading>
            { tag
                ? <SmallChip colors="gold" className="h-10" textClassName="text-xl">{ tag }</SmallChip>
                : <Text bold className="text-element-sub">в общем рейтинге</Text>
            }
        </div>
    </BasicCard>
}