import { Input } from "@/shared/ui/Input"
import { Heading } from "@/shared/ui/Heading"
import { Button } from "@/shared/ui/Button"
import { Text } from "@/shared/ui/Text"
import Link from "next/link"
import { Routes } from "@/shared/config/routes"
import Image from "next/image"
import { PasswordInput } from "@/entities/auth/PasswordInput"
import { LoginWithDiscordButton } from "@/entities/auth/LoginWithDiscordButton"
import { useForm } from "react-hook-form"

export default function Register() {
    const {} = useForm()

    return <div className="flex justify-center items-center h-full w-full">
        <div className="flex items-center flex-col gap-5 p-5 w-120 rounded-2xl bg-island">
            <Heading>Register</Heading>
            <Input className="bg-glade" placeholder="Name" />
            <Input className="bg-glade" placeholder="Email" />
            <PasswordInput className="bg-glade" placeholder="Password" />
            <Button className="bg-accent-island w-full" type="submit">
                <Text className="text-accent-element">Register</Text>
            </Button>
            <div className="flex flex-col gap-2 w-full">
                <Text small className="text-element-sub text-center">OR</Text>
                <LoginWithDiscordButton />
            </div>
            <span className="flex gap-1">
                <Text small className="text-element-sub">Уже есть аккаунт?</Text>
                <Link href={Routes.LOGIN}>
                    <Text small className="text-accent-element">Войди</Text>
                </Link>
            </span>
        </div>
    </div>
}