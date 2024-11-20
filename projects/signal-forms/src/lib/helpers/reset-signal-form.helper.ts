import { SignalForm } from "../interfaces/signal-forms.interface"

/**
 * Resets a SignalForm to it's initial values
 * @param signalForm the SignalForm instance to reset
 */
export function resetSignalForm<T extends Record<string | number | symbol, unknown>>(signalForm: SignalForm<T>): void {
	for (let key of Object.keys(signalForm)) {
		let field = signalForm[key]
		field.currentValue.set(field.initialValue)
		field.touched.set(false)
	}
}