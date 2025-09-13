export function Max<T extends number>(maxValue: number, message?: string) {
    return (value: T) => value > maxValue ? new Error(message ?? `Must be less or equal to ${maxValue}`) : null
}