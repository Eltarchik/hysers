import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { SortCriteria, SortDirection } from "@/entities/filters/types"
import { useCallback } from "react"
import { useSliceInit } from "@/shared/hooks/useSliceInit"

interface SortState {
    criteria: SortCriteria
    direction: SortDirection
    closed: boolean
}

const STORAGE_KEY = "slice-state"

const initialState: SortState = {
    criteria: SortCriteria.HOT,
    direction: SortDirection.DOWN,
    closed: false
}

const saveToStore = (state: SortState) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current(state)))
}

const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSort(state, { payload }: PayloadAction<SortState>) {
            state.closed = payload.closed
            state.criteria = payload.criteria
            state.direction = payload.direction
        },
        select(state, { payload: criteria }: PayloadAction<SortCriteria>) {
            state.criteria = criteria

            saveToStore(state)
        },
        toggleDirection(state) {
            state.direction = state.direction === SortDirection.UP
                ? SortDirection.DOWN
                : SortDirection.UP

            saveToStore(state)
        },
        toggleOpening(state) {
            state.closed = !state.closed

            saveToStore(state)
        }
    }
})

export const sortReducer = sortSlice.reducer

export const useSortInit = () =>
    useSliceInit(STORAGE_KEY, sortSlice.actions.setSort)

export const useSortMutation = () => {
    const dispatch = useDispatch()

    const select = useCallback((criteria: SortCriteria) => {
        dispatch(sortSlice.actions.select(criteria))
    }, [dispatch])

    const toggleDirection = useCallback(() => {
        dispatch(sortSlice.actions.toggleDirection())
    }, [dispatch])

    const toggleOpening = useCallback(() => {
        dispatch(sortSlice.actions.toggleOpening())
    }, [dispatch])

    return  { select, toggleDirection, toggleOpening }
}