import { computed } from "@angular/core";
import { SignalForm } from "../interfaces/signal-forms.interface";

export function signalFormErrors<T>(signalForm: SignalForm<T>) {
    return computed<string[]>(() => getSignalFormErrors(signalForm))
}

export function getSignalFormErrors<T>(signalForm: SignalForm<T>) {
    let errors: string[] = []
    for (let key in signalForm) {
        let field = signalForm[key]
        let validatorList = field.validators
        for (let validator of validatorList) {
            let result = validator(field.$currentValue(), signalForm)
            if (result) {
                errors.push(`${key}: ${result.message}`)
            }
        }
    }
    return errors
}