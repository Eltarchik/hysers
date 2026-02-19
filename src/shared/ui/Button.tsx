import { Menu } from "lucide-react"
import { MouseEventHandler, ReactNode } from "react"
import { cn } from "@/shared/lib/cn"


interface Props {
    type?: "button" | "submit" | "reset"
    className?: string
    children?: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
    type = "button",
    className,
    children,
    onClick
}: Props) => {
    return <button className={cn(
                        "flex justify-center items-center gap-2 h-12 px-5 rounded-2xl bg-island",
                        "cursor-pointer transition-colors duration-200 ease-in",
                        className
                   )}
                   type={type}
                   onClick={onClick}
    >
        { children }
    </button>
}