import { Signal, WritableSignal } from "@angular/core"
import { BaseType } from "./base-type.interface"

export type SignalForm<T extends BaseType> = {
    [K in keyof T]: {
        initialValue: T[K],
        currentValue: WritableSignal<T[K]>,
        touched: WritableSignal<boolean>,
        state: Signal<['error' | 'default', string | null]>,
        valid: Signal<boolean>
    }
}

