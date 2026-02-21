import {NextResponse} from "next/server"
import { localeName } from "@/shared/config/locale"

export async function POST(req: Request) {
    const { locale } = await req.json()

    const response = NextResponse.json({ ok: true })
    response.cookies.set(localeName, locale)

    return response
}