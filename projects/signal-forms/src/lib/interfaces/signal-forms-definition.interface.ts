import { ValidatorFunction } from "./validator-function.interface"

export type SignalFormDefinition<T> = {
    [K in keyof T]: {
        initialValue: T[K],
        validators?: Array<ValidatorFunction<T[K]>>
    }
}