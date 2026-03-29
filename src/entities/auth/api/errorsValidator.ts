class RegisterErrorValidator {
    invalidToken = (msg: string) => {
        return ["Register token not found", "Invalid register token",].includes(msg)
    }

    invalidCode = (msg: string) => {
        return msg === "Invalid code"
    }

    codeIsOutdated = (msg: string) => {
        return msg === "Code not found"
    }
}

export const registerErrorValidator = new RegisterErrorValidator()