'use client'

import { Input } from "@/shared/ui/Input"
import { InputHTMLAttributes, useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "tape"> {
    className?: string
    inputClassName?: string
}

export const PasswordInput = ({
    className,
    inputClassName,
    ...rest
}: Props) => {
    const [ showPassword, setShowPassword ] = useState(false)

    return <Input className={className}
                  inputClassName={inputClassName}
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  {...rest}
    >
        <button className="flex justify-center content-center size-6 cursor-pointer"
                onMouseDown={event => event.preventDefault() }
                onClick={() => setShowPassword(prev => !prev)}
        >
            { showPassword
                ? <Eye color="var(--element-sub)" />
                : <EyeClosed className="mt-1" color="var(--element-sub)" />
            }
        </button>
    </Input>
}