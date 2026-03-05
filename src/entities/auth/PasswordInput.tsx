'use client'

import { Input, InputProps } from "@/shared/ui/Input"
import { InputHTMLAttributes, useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

interface Props extends Omit<InputProps, "tape"> {
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
                type="button"
                onMouseDown={event => {
                    event.stopPropagation()
                    event.preventDefault()
                }}
                onClick={event => {
                    event.preventDefault()
                    setShowPassword(prev => !prev)
                }}
        >
            { showPassword
                ? <Eye color="var(--element-sub)" />
                : <EyeClosed className="mt-1" color="var(--element-sub)" />
            }
        </button>
    </Input>
}