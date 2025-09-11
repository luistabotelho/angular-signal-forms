export function MinLength<T extends string>(length: number, message?: string) {
    return (value: T) => value.length < length ? new Error(message ?? `Must be at least ${length} characters long.`) : null
}