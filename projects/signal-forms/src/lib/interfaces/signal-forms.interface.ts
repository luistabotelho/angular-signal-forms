import { Signal, WritableSignal } from "@angular/core"
import { State } from "./state.interface"
import { ValidatorFunction } from "./validator-function.interface"

export type SignalForm<T> = {
    [K in keyof T]: {
        initialValue: T[K],
        validators: Array<ValidatorFunction<T[K]>>,
        currentValue: WritableSignal<T[K]>,
        touched: WritableSignal<boolean>,
        state: Signal<State>,
        valid: Signal<boolean>
    }
}

