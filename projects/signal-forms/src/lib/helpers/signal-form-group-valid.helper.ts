import { SignalFormGroup } from "../interfaces/signal-form-group.interface";

export function signalFormGroupValid<T>(formGroup: SignalFormGroup<T>) {
    return formGroup.valid()
}