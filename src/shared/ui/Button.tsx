import { Menu } from "lucide-react"
import { MouseEventHandler, ReactNode } from "react"
import { cn } from "@/shared/lib/cn"


interface Props {
    type?: "button" | "submit" | "reset"
    className?: string
    disabled?: boolean
    children?: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
    type = "button",
    className,
    disabled = false,
    children,
    onClick
}: Props) => {
    return <button className={cn(
                        "flex justify-center items-center gap-2 h-12 px-5 rounded-2xl bg-island",
                        "disabled:bg-glade",
                        "enabled:cursor-pointer transition-colors duration-200 ease-in",
                        className
                   )}
                   disabled={disabled}
                   type={type}
                   onClick={onClick}
    >
        { children }
    </button>
}