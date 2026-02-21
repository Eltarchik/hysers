'use client';

import { Text } from "@/shared/ui/Text"
import { useLocale } from "next-intl"
import { Button } from "@/shared/ui/Button"
import { setLang } from "@/shared/api/locale"
import { Locale } from "@/shared/config/locale"
import { cn } from "@/shared/lib/cn"
import { useOverlay } from "@/shared/hooks/useOverlay"

export const ChangeLocaleButton = () => {
    const locale = useLocale()

    const [ opened, setOpened, ref ] = useOverlay<HTMLDivElement>()

    const onItemClick = async (lang: Locale) => {
        if (locale === lang) return

        await setLang(lang)
        location.reload()
    }

    return <div className="relative flex flex-col" ref={ref}>
        <Button className="w-24"
                onClick={() => setOpened(prev => !prev)}
        >
            <Text>{ locale.toUpperCase() }</Text>
        </Button>
        { opened &&
            <div className="absolute top-full translate-y-2 flex flex-col p-2 w-full rounded-2xl bg-island">
                { Object.values(Locale).map(lang =>
                    <button key={ lang }
                            className={ cn(
                                "flex justify-center items-center px-3 h-10 rounded-lg cursor-pointer",
                                lang === locale && "bg-glade"
                            ) }
                            onClick={ () => onItemClick(lang) }
                    >
                        <Text className={lang === locale ? "text-element-imp" : ""}>{ lang.toUpperCase() }</Text>
                    </button>
                ) }
            </div>
        }
    </div>
}