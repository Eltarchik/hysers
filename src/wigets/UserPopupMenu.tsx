import { ClassProp } from "@/shared/ui/propsPresets"
import { PopupList } from "@/shared/ui/PopupList"
import { UserMenuAction, userMenuConfig } from "@/wigets/userMenuConfig"
import { ListButton } from "@/shared/ui/ListButton"
import { Text } from "@/shared/ui/Text"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authAPI } from "@/entities/auth/api/api"
import { userMetaKey } from "@/entities/user/queryKeys"
import { getServersKey } from "@/entities/server/queryKeys"
import { Server } from "@/entities/server/types"
import { useSelector } from "react-redux"
import { RootState } from "@/shared/config/store"


type Props = ClassProp

export const UserPopupMenu = (
    { className }: Props
) => {
    const items = userMenuConfig // todo integrate localization
    const filters = useSelector((state: RootState)=> state.filters.selected)

    const serversKey = getServersKey(filters, 0)
    const queryClient = useQueryClient()

    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            return await authAPI.logout()
        },
        onMutate: async () => {
            queryClient.setQueryData(userMetaKey, null)
            queryClient.setQueryData<Server[] | undefined>(serversKey, prev =>
                    prev?.map(server => ({
                        ...server,
                        liked: false,
                    }),
                ),
            )
        }
    })

    return <PopupList className={className} items={items} renderItem={item =>
        <ListButton key={item.value}
                    className={item.value === UserMenuAction.LOGOUT
                        ? "hover:text-red-element hover:bg-red-island"
                        : undefined
                    }
                    onClick={() => logout()}
        >
            { item.icon && <item.icon /> }
            <Text className="text-inherit">{ item.title }</Text>
        </ListButton>
    }>

    </PopupList>
}