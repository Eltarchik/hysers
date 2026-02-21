import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"
import { Filters } from "@/entities/filters/types"
import { useCallback } from "react"

interface FiltersState {
    selected: Record<Filters, string[]>
    closed: Filters[]
}

type togglePayload = PayloadAction<{
    name: Filters,
    item: string
}>

const initialState: FiltersState = {
    selected: Object.fromEntries(
        Object.values(Filters).map(name => [name, []])
    ) as unknown as Record<Filters, string[]>,
    closed: []
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleFilter(state, { payload }: togglePayload) {
            const filters = state.selected[payload.name]

            if (filters.includes(payload.item)) {
                const index = filters.indexOf(payload.item)
                filters.splice(index, 1)

            } else {
                filters.push(payload.item)
            }
        },
        toggleOpening(state, { payload: name }: PayloadAction<Filters>) {
            if (state.closed.includes(name)) {
                const index = state.closed.indexOf(name)
                state.closed.splice(index, 1)

            } else {
                state.closed.push(name)
            }
        }
    }
})

export const filtersReducer = filtersSlice.reducer

export const useFiltersMutation = () => {
    const dispatch = useDispatch()

    const toggleSelecting = useCallback((name: Filters, item: string) => {
        dispatch(filtersSlice.actions.toggleFilter({ name, item }))
    }, [dispatch])

    const toggleOpening = useCallback((name: Filters) => {
        dispatch(filtersSlice.actions.toggleOpening(name))
    }, [dispatch])

    return  { toggleSelecting, toggleOpening }
}