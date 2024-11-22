import { Signal, computed } from "@angular/core"
import { SignalForm } from "../interfaces/signal-forms.interface"

/**
 * Creates a signal representing the SignalForm validity
 * @param signalForm the SignalForm instance
 * @returns a boolean Signal representing the form validity
 */
export function isSignalFormValid<T>(signalForm: SignalForm<T>): Signal<boolean> {
	return computed(() => {
		for (let key in signalForm) {
			let field = signalForm[key]
			if (!field.valid()) {
				return false
			}
		}
		return true
	})
}