import { configureStore } from '@reduxjs/toolkit'
import { sortReducer } from "@/entities/filters/slices/sortSlice"
import { filtersReducer } from "@/entities/filters/slices/filtersSlice"

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        sort: sortReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch