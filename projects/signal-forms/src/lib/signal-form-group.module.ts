import { computed, signal } from "@angular/core";
import { getSignalFormErrors } from "./helpers/signal-form-errors.helper";
import { getSignalFormValid } from "./helpers/signal-form-valid.helper";
import { SignalFormGroup } from "./interfaces/signal-form-group.interface";
import { SignalFormDefinition } from "./interfaces/signal-forms-definition.interface";
import { SignalFormOptions } from "./interfaces/signal-forms-options.interface";
import { SignalForm } from "./interfaces/signal-forms.interface";
import { signalForm as form } from "./signal-forms.module";
import { getSignalFormValue } from "./helpers/signal-form-value.helper";

export function signalFormGroup<T>(
    initialValue: SignalFormDefinition<T>,
    options?: SignalFormOptions
): SignalFormGroup<T> {
    return {
        data: signal<Array<SignalForm<T>>>([]),
        addItem() {
            this.data.update(current => {
                return [
                    ...current,
                    form<T>(initialValue, options)
                ]
            })
        },
        removeItem(index: number) {
            this.data.update(current => {
                current.splice(index, 1)
                return [...current]
            })
        },
        value() {
            return computed(() => this.data().map(form => getSignalFormValue(form)))
        },
        valid() {
            return computed(() => this.data().every(form => getSignalFormValid(form)))
        },
        errors() {
            return computed(() => this.data().map(form => getSignalFormErrors(form)).flat())
        },
    }
}