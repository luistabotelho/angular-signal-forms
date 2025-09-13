export function Email<T extends string>(message?: string) {
    return (value: T) => !RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value) 
        ? new Error(message ?? "Must be a valid email")
        : null
}