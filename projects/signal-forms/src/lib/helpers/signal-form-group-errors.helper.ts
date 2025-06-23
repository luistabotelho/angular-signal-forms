import { SignalFormGroup } from "../interfaces/signal-form-group.interface";

export function signalFormGroupErrors<T>(formGroup: SignalFormGroup<T>) {
    return formGroup.errors()
}