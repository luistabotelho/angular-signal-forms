export function Required<T>(message?: string) {
    return (value: T) => !value ? new Error(message ?? "Required") : null
}