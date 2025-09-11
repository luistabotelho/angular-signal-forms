export function RegExp<T extends string>(regex: RegExp, message?: string) {
    return (value: T) => !regex.test(value) ? new Error(message ?? `Does not match required pattern ${regex}`) : null
}