'use client'

import { store } from "@/shared/config/store"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()

    return <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    </Provider>
}