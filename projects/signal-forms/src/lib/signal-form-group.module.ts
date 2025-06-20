import { computed, signal } from "@angular/core";
import { getSignalFormErrors } from "./helpers/signal-form-errors.helper";
import { getSignalFormValid } from "./helpers/signal-form-valid.helper";
import { getSignalFormValue } from "./helpers/signal-form-value.helper";
import { SignalFormGroup } from "./interfaces/signal-form-group.interface";
import { SignalFormDefinition } from "./interfaces/signal-forms-definition.interface";
import { SignalFormOptions } from "./interfaces/signal-forms-options.interface";
import { SignalForm } from "./interfaces/signal-forms.interface";
import { signalForm } from "./signal-forms.module";

export function signalFormGroup<T>(
    initialValue: SignalFormDefinition<T>,
    options?: SignalFormOptions
): SignalFormGroup<T> {
    return {
        $data: signal<Array<SignalForm<T>>>([]),
        addItem(value?: Partial<T>) {
            this.$data.update(current => {
                let newSignalForm = signalForm(initialValue, options)
                setExistingValues(newSignalForm, value)
                return [
                    ...current,
                    newSignalForm
                ]
            })
        },
        removeItem(index: number) {
            this.$data.update(current => {
                current.splice(index, 1)
                return [...current]
            })
        },
        value() {
            return computed(() => this.$data().map(form => getSignalFormValue(form)))
        },
        valid() {
            return computed(() => this.$data().every(form => getSignalFormValid(form)))
        },
        errors() {
            return computed(() => this.$data().map(form => getSignalFormErrors(form)).flat())
        },
    }
}

function setExistingValues<T>(form: SignalForm<T>, value?: Partial<T>) {
    if (value) {
        for (let key in form) {
            let fieldValue = value[key]
            if (fieldValue) {
                form[key].$currentValue.set(fieldValue)
                form[key].$touched.set(true)
            }
        }
    }
}