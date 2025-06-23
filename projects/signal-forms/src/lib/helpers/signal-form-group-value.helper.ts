import { SignalFormGroup } from "../interfaces/signal-form-group.interface";

export function signalFormGroupValue<T>(formGroup: SignalFormGroup<T>) {
    return formGroup.value()
}