export type ValidatorFunction<T> = (value: T) => Error | null