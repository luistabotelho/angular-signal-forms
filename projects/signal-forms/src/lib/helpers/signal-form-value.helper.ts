import { computed } from "@angular/core"
import { SignalForm } from "../interfaces/signal-forms.interface"

export function signalFormValue<T extends Record<string | number | symbol, unknown>>(signalForm: SignalForm<T>) {
	return computed(() => {
		let output: Record<string | number | symbol, unknown> = {}
		for (let key of Object.keys(signalForm)) {
			output[key] = signalForm[key].currentValue()
		}
		return output as T
	})
}