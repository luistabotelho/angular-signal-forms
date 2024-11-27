import { computed } from "@angular/core";
import { SignalForm } from "../interfaces/signal-forms.interface";

export function signalFormErrors<T>(form: SignalForm<T>) {
    return computed<string[]>(() => {
        let errors: string[] = []
        for (let key in form) {
            let field = form[key]
            let validatorList = field.validators
            for (let validator of validatorList) {
                let result = validator(field.currentValue(), form)
                if (result) {
                    errors.push(`${key}: ${result.message}`)
                }
            }
        }
        return errors
    })
}