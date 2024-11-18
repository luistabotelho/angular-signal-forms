/**
 * Private helper. Runs all validators and returns the validation message if any fail
 * @param validators the list of validators
 * @param currentValue the currentValue signal value
 * @returns The validation message of the failed validator
 */
export function runValidators(validators: Array<Function>, currentValue: any): string | null {
	for (let validator of validators) {
		let validationResult = validator(currentValue)
		if (validationResult) {
			return validationResult
		}
	}
	return null
}