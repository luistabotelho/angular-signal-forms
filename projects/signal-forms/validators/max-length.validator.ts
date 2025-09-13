export function MaxLength<T extends string>(length: number, message?: string) {
    return (value: T) => value.length > length ? new Error(message ?? `Must not exceed ${length} characters.`) : null
}