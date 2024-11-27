import { SignalForm } from "../interfaces/signal-forms.interface";


/**
 * Sets all the fields in the SignalForm to touched, allowing field state to display.
 * 
 * Can be used in case of a form which requires touched and the user attempted to submit as to show all fields with errors.
 * 
 * @param form The SignalForm instance
 */
export function signalFormSetTouched<T>(form: SignalForm<T>) {
    for (let key in form) {
        let field = form[key]
        field.touched.set(true)
    }
}