
import { resetSignalForm } from "./helpers/reset-signal-form.helper"
import { getValidatorResult } from "./helpers/run-validators.helper"
import { signalFormErrors } from "./helpers/signal-form-errors.helper"
import { SignalFormDefinition } from "./interfaces/signal-forms-definition.interface"
import { SignalForm } from "./interfaces/signal-forms.interface"
import { signalForm } from "./signal-forms.module"
import { signalFormValid } from "./helpers/signal-form-valid.helper";
import { signalFormValue } from "./helpers/signal-form-value.helper"
import { signalFormOptionsDefaults } from "./config/defaults.config"
import { signalFormSetTouched } from "./helpers/signal-form-set-touched.helper"
import { signalFormGroup } from "./signal-form-group.module"
import { SignalFormGroup } from "./interfaces/signal-form-group.interface"

interface ITestObject {
    field1: string
    field1Child: string
    field2: number
    field3: Date
}

let signalFormDefinition: SignalFormDefinition<ITestObject> = {
    field1: {
        initialValue: "Placeholder"
    },
    field1Child: {
        initialValue: "",
        validators: [
            (val, form) => !val && form.field1.currentValue() ? new Error("Required if field1 given") : null
        ]
    },
    field2: {
        initialValue: 0,
        validators: [
            val => !val ? new Error("Required") : null
        ]
    },
    field3: {
        initialValue: new Date('2024-11-20T09:30:11'),
        validators: [
            val => val.toISOString().slice(0,10) < '2024-11-21' ? new Error("Must be after 2024-11-21") : null,
            val => val.getHours() != 0 ? new Error("Should be midnight") : null
        ]
    }
}

describe('signalForms', () => {
    let form: SignalForm<ITestObject>
    let customForm: SignalForm<ITestObject>

    beforeEach(() => {
        form = signalForm(signalFormDefinition)
        customForm = signalForm(signalFormDefinition, {
            requireTouched: false,
            errorState: 'myError',
            defaultState: 'myDefault'
        })
    })

    it('should return a SignalForm', () => {
        let keys = Object.keys(form)
        expect(keys).toHaveSize(4)
        expect(keys).toContain('field1')
    })

    it('should contain all form fields', () => {
        let keys = Object.keys(form.field1).sort()
        expect(keys).toEqual(['currentValue', 'initialValue', 'state', 'touched', 'valid', 'validators'].sort())
    })

    it('should require touched by default', () => {
        expect(form.field3.state().state).toBe(signalFormOptionsDefaults.defaultState)
    })

    it('should allow touched to be optional', () => {
        expect(customForm.field3.valid()).toBeFalse()
    })

    it('should allow customizing state', () => {
        expect(customForm.field1.state().state).toBe('myDefault')
        customForm.field3.touched.set(true)
        expect(customForm.field3.state().state).toBe('myError')
    })

    it('should return the validator message', () => {
        expect(customForm.field3.state().message).toBe("Must be after 2024-11-21")
    })

    it('should allow partial options', () => {
        let localForm = signalForm({
            test: {
                initialValue: "",
                validators: [
                    val => !val ? new Error("Required") : null
                ]
            }
        }, {
            requireTouched: false
        })
        expect(localForm.test.touched()).toBeFalse()
        expect(localForm.test.state().state).toBe(signalFormOptionsDefaults.errorState)
    })

    it('should allow validating one field based on another field', () => {
        form.field1.currentValue.set("Not null")
        form.field1.touched.set(true)
        form.field1Child.touched.set(true)
        expect(form.field1Child.valid()).toBeFalse()
        expect(form.field1Child.state()).toEqual({state: signalFormOptionsDefaults.errorState, message: "Required if field1 given"})
    })

    describe('resetSignalForm', () => {
        it('should reset the SignalForm', () => {
            form.field1.currentValue.set('Modified')
            form.field1.touched.set(true)
            expect(form.field1.currentValue()).toEqual('Modified')
            expect(form.field1.initialValue).toEqual('Placeholder')
            resetSignalForm(form)
            expect(form.field1.currentValue()).toEqual('Placeholder')
            expect(form.field1.touched()).toBeFalse()
        })
    })

    describe('getValidatorResult', () => {
        it('should return the first error message generated by the validator functions', () => {
            let test1 = getValidatorResult(form, form.field1.validators, form.field1.currentValue())
            let test2 = getValidatorResult(form, form.field3.validators, form.field3.currentValue())

            expect(test1).toBeNull()
            expect(test2).toBe("Must be after 2024-11-21")
        })
    })

    describe('signalFormErrors', () => {
        it('should return all form errors', () => {
            let errors = signalFormErrors(customForm)
            expect(errors()).toHaveSize(4)
        })
    })

    describe('signalFormValid', () => {
        it('should validate the entire form', () => {
            let $valid = signalFormValid(customForm)
            expect($valid()).toBeFalse()
        })

        it('should ignore the touched properties', () => {
            let $valid = signalFormValid(form)
            expect($valid()).toBeFalse()
        })
    })

    describe('signalFormValue', () => {
        it('should return an object of T in SignalForm<T>', () => {
            let $value = signalFormValue(form)
            let originalObjectKeys = Object.keys(signalFormDefinition).sort()
            let keys = Object.keys($value()).sort()
            expect(keys).toEqual(originalObjectKeys)
            expect($value().field1).toBe('Placeholder')
        })
    })

    describe('signalFormSetTouched', () => {
        it ('should set all SignalForm fields as touched', () => {
            signalFormSetTouched(form)
            Object.entries(form).forEach(([key, field]) => {
                expect(field.touched()).withContext(key).toBeTrue()
            })
        })
    })
})

describe('signalFormGroup', () => {
    let formGroup: SignalFormGroup<ITestObject>

    beforeEach(() => {
        formGroup = signalFormGroup(signalFormDefinition)
        formGroup.addItem()
    })

    describe('.addItem()', () => {
        it('should allow adding an item', () => {
            formGroup.addItem()
            expect(formGroup.data().length).withContext('signalFormGroup.length').toBe(2)
        })
    })

    describe('.removeItem()', () => {
        it('should allow removing an item by index', () => {
            formGroup.addItem()
            formGroup.data()[1].field1.currentValue.set("Updated")
            formGroup.removeItem(0)
            expect(formGroup.data().length).withContext('signalFormGroup.length').toBe(1)
            expect(formGroup.data()[0].field1.currentValue()).withContext('last form in group value').toBe("Updated")
        })
    })

    describe('.valid()', () => {
        it('should return a signal validating all forms', () => {
            let form0 = formGroup.data()[0]
            let today = new Date()
            today.setHours(0,0,0,0)
            form0.field1.currentValue.set("Valid")
            form0.field1Child.currentValue.set("Also Valid")
            form0.field2.currentValue.set(1)
            form0.field3.currentValue.set(today)
            expect(formGroup.valid()()).withContext('form group with single valid item').toBeTrue()
            formGroup.addItem()
            expect(formGroup.valid()()).withContext('form group after adding invalid item').toBeFalse()
        })
    })

    describe('.errors()', () => {
        it('should return a signal containing an array of errors', () => {
            let $errors = formGroup.errors()
            formGroup.addItem()
            expect($errors()).toBeInstanceOf(Array)
            expect($errors().length).toBe(8)
            let field1ChildError = 'field1Child: Required if field1 given'
            expect($errors()[0]).toBe(field1ChildError)
            expect($errors()[4]).toBe(field1ChildError)
        })
    })

    describe('.value()', () => {
        it('should return a signal containing an array of T', () => {
            let formValue = formGroup.value()()
            expect(formValue).toBeInstanceOf(Array)
            expect(formValue[0].field1).toBe('Placeholder')
        })
    })
})