'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "@/shared/ui/Button"
import { LIGHT_THEME, toggleTheme } from "@/shared/config/theme"
import { cn } from "@/shared/lib/cn"
import { useEffect, useState } from "react"

export const ChangeThemeButton = () => {
    const [isLight, setIsLight] = useState(false)

    useEffect(() => {
        setIsLight(document.documentElement.classList.contains(LIGHT_THEME))
    }, [])

    const toggle = () => {
        toggleTheme()
        setIsLight(prev => !prev)
    }

    return <Button className="relative justify-center items-center px-0 size-12 overflow-hidden"
                   onClick={toggle}
    >
        <div className={cn(
                "absolute flex flex-col gap-4 mt-10 overflow-hidden",
                "transition-transform duration-200 ease-in",
                !isLight && "-translate-y-10"
             )}
        >
            <Sun className={cn(
                    "transition-opacity duration-200 ease-in",
                    !isLight && "opacity-0"
                 )}
            />
            <Moon className={cn(
                    "transition-opacity duration-200 ease-in",
                    isLight && "opacity-0"
                  )}
            />
        </div>
    </Button>
}