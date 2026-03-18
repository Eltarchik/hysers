import {getRequestConfig} from 'next-intl/server';
import { cookies } from "next/headers"
import { defaultLocale, localeName } from "@/shared/config/locale"

export default getRequestConfig(async () => {
    const cookieStore = await cookies()
    const locale = cookieStore.get(localeName)?.value || defaultLocale

    return {
        locale,
        messages: (await import(`./translations/${locale}.json`)).default
    }
})