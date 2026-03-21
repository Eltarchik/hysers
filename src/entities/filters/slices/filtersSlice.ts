import { createSlice, PayloadAction, current } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { Filters } from "@/entities/filters/types"
import { useCallback, } from "react"
import { useSliceInit } from "@/shared/hooks/useSliceInit"

interface FiltersState {
    selected: Record<Filters, string[]>
    closed: Filters[]
}

type togglePayload = PayloadAction<{
    name: Filters,
    item: string
}>

const STORAGE_KEY = "filters-state"

const initialState: FiltersState = {
    selected: Object.fromEntries(
        Object.values(Filters).map(name => [name, []])
    ) as unknown as Record<Filters, string[]>,
    closed: []
}

const saveToStore = (state: FiltersState) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current(state)))
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters(state, { payload }: PayloadAction<FiltersState>) {
            state.selected = payload.selected
            state.closed = payload.closed
        },
        toggleFilter(state, { payload }: togglePayload) {
            const filters = state.selected[payload.name]

            if (filters.includes(payload.item)) {
                const index = filters.indexOf(payload.item)
                filters.splice(index, 1)

            } else {
                filters.push(payload.item)
            }

            saveToStore(state)
        },
        toggleOpening(state, { payload: name }: PayloadAction<Filters>) {
            if (state.closed.includes(name)) {
                const index = state.closed.indexOf(name)
                state.closed.splice(index, 1)

            } else {
                state.closed.push(name)
            }

            saveToStore(state)
        }
    }
})

export const filtersReducer = filtersSlice.reducer

export const useFiltersInit = () =>
    useSliceInit(STORAGE_KEY, filtersSlice.actions.setFilters)

export const useFiltersSlice = () => {
    const dispatch = useDispatch()

    const toggleSelecting = useCallback((name: Filters, item: string) => {
        dispatch(filtersSlice.actions.toggleFilter({ name, item }))
    }, [dispatch])

    const toggleOpening = useCallback((name: Filters) => {
        dispatch(filtersSlice.actions.toggleOpening(name))
    }, [dispatch])

    return  { toggleSelecting, toggleOpening }
}