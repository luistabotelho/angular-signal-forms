import { Signal, WritableSignal } from "@angular/core"

export type SignalForm<T> = {
    [K in keyof T]: {
        initialValue: T[K],
        currentValue: WritableSignal<T[K]>,
        touched: WritableSignal<boolean>,
        state: Signal<['error' | 'default', string | null]>,
        valid: Signal<boolean>
    }
}

