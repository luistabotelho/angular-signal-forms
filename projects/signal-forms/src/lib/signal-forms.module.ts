import { signal, computed } from "@angular/core"
import { runValidators } from "./helpers/run-validators.helper"
import { SignalFormOptions } from "./interfaces/signal-forms-options.interface"
import { SignalFormDefinition } from "./interfaces/signal-forms-definition.interface"
import { SignalForm } from "./interfaces/signal-forms.interface"
import { State } from "./interfaces/state.interface"


const signalFormOptionsDefaults: SignalFormOptions = {
    requireTouched: true,
	defaultState: 'default',
	errorState: 'error'
}

/**
 * Creates a new instance of SignalForm from a SignalFormDefinition
 * @param initialValue A record containing all field definitions with initialValue and validators
 * @param options An optional SignalFormOptions object
 * @returns a SignalForm
 */
export function signalForm<T>(
    initialValue: SignalFormDefinition<T>, 
    options: SignalFormOptions = signalFormOptionsDefaults
) {
	let signalForm = {} as SignalForm<T>
	for (let key in initialValue) {
		let value = initialValue[key]
		signalForm[key] = {
			initialValue: value.initialValue,
			currentValue: signal(value.initialValue),
			touched: signal(false),
			state: computed(() => {
				if (options.requireTouched && !signalForm[key].touched()) {
					return {state: options.defaultState, message: null}
				}
				let validationResult = runValidators(value.validators ?? [], signalForm[key].currentValue())
				if (validationResult) {
					return {state: options.errorState, message: validationResult}
				}
				return {state: options.defaultState, message: null}
			}),
			valid: computed(() => !runValidators(value.validators ?? [], signalForm[key].currentValue()))
		}
	}

	return signalForm
}