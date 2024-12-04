import { Signal, computed } from "@angular/core"
import { SignalForm } from "../interfaces/signal-forms.interface"

/**
 * Creates a signal representing the SignalForm validity
 * @param signalForm the SignalForm instance
 * @returns a boolean Signal representing the form validity
 */
export function signalFormValid<T>(signalForm: SignalForm<T>): Signal<boolean> {
	return computed(() => getSignalFormValid(signalForm))
}

export function getSignalFormValid<T>(signalForm: SignalForm<T>) {
	for (let key in signalForm) {
		let field = signalForm[key]
		if (!field.valid()) {
			return false
		}
	}
	return true
}