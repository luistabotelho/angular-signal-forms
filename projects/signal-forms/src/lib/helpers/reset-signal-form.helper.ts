import { SignalForm } from "../interfaces/signal-forms.interface"

/**
 * Resets a SignalForm to it's initial values
 * @param signalForm the SignalForm instance to reset
 */
export function resetSignalForm<T>(signalForm: SignalForm<T>): void {
	for (let key in signalForm) {
		let field = signalForm[key]
		field.$currentValue.set(field.initialValue)
		field.$touched.set(false)
	}
}