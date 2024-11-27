import { SignalForm } from "./signal-forms.interface";

export type ValidatorFunction<FormValue, PropertyValue> = (value: PropertyValue, form: SignalForm<FormValue>) => Error | null