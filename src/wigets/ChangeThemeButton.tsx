'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "@/shared/ui/Button"
import { enableThemeTogglingAnimation } from "@/shared/config/theme"
import { cn } from "@/shared/lib/cn"
import { useTheme } from "next-themes"
import { useMounted } from "@/shared/hooks/useMounted"
import { useEffect, useState } from "react"

export const ChangeThemeButton = () => {
    const { setTheme, resolvedTheme } = useTheme()
    const isLight = resolvedTheme === "light"

    const mounted = useMounted()
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setShow(true), 10)

        return () => clearTimeout(timeout)
    }, [])

    const toggle = () => {
        enableThemeTogglingAnimation()
        setTheme(isLight ? "dark" : "light")
    }


    return <Button className="relative justify-center items-center px-0 size-12 overflow-hidden"
                   onClick={toggle}
    >
        <div className={cn(
                "absolute flex flex-col gap-4 mt-10 opacity-0",
                "transition-[transform,opacity] duration-200 ease-in",
                show && "opacity-100",
                mounted && !isLight && "-translate-y-10",
             )}
        >
            <Sun className={ cn(
                    "transition-opacity duration-200 ease-in",
                    mounted && !isLight && "opacity-0",
                 )}
            />
            <Moon className={ cn(
                    "transition-opacity duration-200 ease-in",
                    mounted && isLight && "opacity-0",
                  )}
            />
        </div>
    </Button>
}