import { signal, computed } from "@angular/core"
import { getValidatorResult } from "./helpers/run-validators.helper"
import { SignalFormOptions } from "./interfaces/signal-forms-options.interface"
import { SignalFormDefinition } from "./interfaces/signal-forms-definition.interface"
import { SignalForm } from "./interfaces/signal-forms.interface"
import { signalFormOptionsDefaults } from "./config/defaults.config"


/**
 * Creates a new instance of SignalForm from a SignalFormDefinition
 * @param initialValue A record containing all field definitions with initialValue and validators
 * @param options An optional SignalFormOptions object
 * @returns a SignalForm
 */
export function signalForm<T>(
    initialValue: SignalFormDefinition<T>, 
    options?: Partial<SignalFormOptions>
) {
	const validatedOptions: SignalFormOptions = {
		requireTouched: options?.requireTouched ?? signalFormOptionsDefaults.requireTouched,
		defaultState: options?.defaultState ?? signalFormOptionsDefaults.defaultState,
		errorState: options?.errorState ?? signalFormOptionsDefaults.errorState
	}
	let signalForm = {} as SignalForm<T>
	for (let key in initialValue) {
		let value = initialValue[key]
		signalForm[key] = {
			initialValue: value.initialValue,
			validators: value.validators ?? [],
			$currentValue: signal(value.initialValue),
			$touched: signal(false),
			$state: computed(() => {
				if (validatedOptions.requireTouched && !signalForm[key].$touched()) {
					return validatedOptions.defaultState
				}
				let validationResult = getValidatorResult(signalForm, value.validators ?? [], signalForm[key].$currentValue())
				if (validationResult) {
					return validatedOptions.errorState
				}
				return validatedOptions.defaultState
			}),
			$stateMessage: computed(() => getValidatorResult(signalForm, value.validators ?? [], signalForm[key].$currentValue())),
			$valid: computed(() => !getValidatorResult(signalForm, value.validators ?? [], signalForm[key].$currentValue()))
		}
	}

	return signalForm
}