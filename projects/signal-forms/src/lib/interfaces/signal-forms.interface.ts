import { Signal, WritableSignal } from "@angular/core"
import { ValidatorFunction } from "./validator-function.interface"

export type SignalForm<T> = {
    [K in keyof T]: {
        initialValue: T[K],
        validators: Array<ValidatorFunction<T, T[K]>>,
        currentValue: WritableSignal<T[K]>,
        touched: WritableSignal<boolean>,
        state: Signal<string>,
        stateMessage: Signal<string | null>,
        valid: Signal<boolean>
    }
}

