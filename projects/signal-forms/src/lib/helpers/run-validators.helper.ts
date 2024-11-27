import { SignalForm } from "../interfaces/signal-forms.interface"
import { ValidatorFunction } from "../interfaces/validator-function.interface"

/**
 * Private helper. Runs all validators and returns the validation message if any fail
 * @param fieldValidators the list of validators
 * @param fieldValue the currentValue signal value
 * @returns The validation message of the failed validator
 */
export function getValidatorResult<FormValue, FormProperty>(form: SignalForm<FormValue>, fieldValidators: Array<ValidatorFunction<FormValue, FormProperty>>, fieldValue: FormProperty): string | null {
	for (let validator of fieldValidators) {
		let validationResult = validator(fieldValue, form)
		if (validationResult) {
			return validationResult.message
		}
	}
	return null
}