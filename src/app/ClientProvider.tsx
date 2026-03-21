'use client'

import { store } from "@/shared/config/store"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()

    return <ThemeProvider attribute="class"
                          defaultTheme="dark"
                          value={{ light: "light", dark: "dark" }}
                          disableTransitionOnChange
    >
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                { children }
            </QueryClientProvider>
        </Provider>
    </ThemeProvider>
}