import { Signal, computed } from "@angular/core"
import { SignalForm } from "../interfaces"

/**
 * Creates a signal representing the SignalForm validity
 * @param signalForm the SignalForm instance
 * @returns a boolean Signal representing the form validity
 */
export function isSignalFormValid<T extends Record<string | number | symbol, unknown>>(signalForm: SignalForm<T>): Signal<boolean> {
	return computed(() => {
		for (let key of Object.keys(signalForm)) {
			let field = signalForm[key]
			if (!field.valid()) {
				return false
			}
		}
		return true
	})
}