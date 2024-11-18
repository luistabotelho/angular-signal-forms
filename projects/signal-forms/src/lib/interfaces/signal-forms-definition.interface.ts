import { BaseType } from "./base-type.interface"

export type SignalFormDefinition<T extends BaseType> = {
    [K in keyof T]: {
        initialValue: T[K],
        validators?: Array<(value: T[K]) => Error | null>
    }
}