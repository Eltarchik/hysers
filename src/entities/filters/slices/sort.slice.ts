import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"
import { Filters, SortCriteria, SortDirection } from "@/entities/filters/types"
import { useCallback } from "react"

interface SortState {
    criteria: SortCriteria
    direction: SortDirection
    closed: boolean
}

const initialState: SortState = {
    criteria: SortCriteria.HOT,
    direction: SortDirection.DOWN,
    closed: false
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        select(state, { payload: criteria }: PayloadAction<SortCriteria>) {
            state.criteria = criteria
        },
        toggleDirection(state) {
            state.direction = state.direction === SortDirection.UP
                ? SortDirection.DOWN
                : SortDirection.UP
        },
        toggleOpening(state) {
            state.closed = !state.closed
        }
    }
})

export const sortReducer = sortSlice.reducer

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