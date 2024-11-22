import { ValidatorFunction } from "../interfaces/validator-function.interface"

/**
 * Private helper. Runs all validators and returns the validation message if any fail
 * @param validators the list of validators
 * @param currentValue the currentValue signal value
 * @returns The validation message of the failed validator
 */
export function getValidatorResult<T>(validators: Array<ValidatorFunction<T>>, currentValue: T): string | null {
	for (let validator of validators) {
		let validationResult = validator(currentValue)
		if (validationResult) {
			return validationResult.message
		}
	}
	return null
}