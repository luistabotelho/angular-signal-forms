import { computed } from "@angular/core"
import { SignalForm } from "../interfaces/signal-forms.interface"

export function signalFormValue<T>(signalForm: SignalForm<T>) {
	return computed(() => getSignalFormValue(signalForm))
}

export function getSignalFormValue<T>(signalForm: SignalForm<T>) {
	let output: Record<string | number | symbol, unknown> = {}
	for (let key in signalForm) {
		output[key] = signalForm[key].$currentValue()
	}
	return output as T
}