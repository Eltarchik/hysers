import { TagFilters } from "@/entities/filters/config/tags"
import { RegionFilters } from "@/entities/filters/config/regions"
import { BasicCard } from "@/entities/server/ui/serverPageCards/BasicCard"
import { SmallChip } from "@/shared/ui/SmallChip"
import { Text } from "@/shared/ui/Text"


interface Props {
    tags?: TagFilters[],
    region?: RegionFilters,
}

export const ServerTagsAndRegionCard = (
    { tags, region }: Props
) => {
    if (!tags || !tags.length || !region) return

    return <BasicCard>
        <div className="flex gap-3 flex-wrap">
            <Text bold className="w-full text-element-sub">Теги</Text>
            { tags?.map(tag =>
                <SmallChip key={tag} className="h-10" textClassName="text-xl">
                    { tag }
                </SmallChip>
            )}
        </div>
        { region &&
            <div className="flex flex-col gap-3">
                <Text bold className="w-full text-element-sub">Регион</Text>
                <SmallChip className="h-10 w-fit" textClassName="text-xl">
                    { region }
                </SmallChip>
            </div>
        }
    </BasicCard>
}