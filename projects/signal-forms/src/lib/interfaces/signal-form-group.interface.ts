import { Signal, WritableSignal } from "@angular/core";
import { SignalForm } from "./signal-forms.interface";

export type SignalFormGroup<T> = {
    data: WritableSignal<Array<SignalForm<T>>>
    addItem(value?: Partial<T>): void
    removeItem(index: number): void
    value(): Signal<Array<T>>
    valid(): Signal<boolean>
    errors(): Signal<Array<string>>
}