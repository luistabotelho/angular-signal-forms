export function Min<T extends number>(minValue: number, message?: string) {
    return (value: T) => value < minValue ? new Error(message ?? `Must be greater or equal than ${minValue}`) : null
}