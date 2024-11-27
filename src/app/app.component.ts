import { Component } from '@angular/core';
import { signalForm, signalFormValue, signalFormValid, resetSignalForm } from '../../projects/signal-forms/src/public-api';
import { FormsModule } from '@angular/forms';
import { signalFormErrors } from '../../projects/signal-forms/src/lib/helpers/signal-form-errors.helper';
import { CommonModule } from '@angular/common';

interface DataType {
  field1: string
  field1Child: string
  field2: string
  dateField: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-signal-forms';

  form = signalForm<DataType>({
    field1: {
      initialValue: "",
      validators: [
        (val) => !val ? new Error("Required") : null,
        (val) => val && !RegExp(/^[A-Z]{1}/).test(val) ? new Error("First letter must be upper case") : null,
        (val) => val && val.length > 10 ? new Error("Must not exceed 10 characters") : null
      ]
    },
    field1Child: {
      initialValue: "",
      validators: [
        (val, form) => !val && form.field1.currentValue() ? new Error("Required if Field 1 contains a value") : null,
      ]
    },
    field2: {
      initialValue: ""
    },
    dateField: {
      initialValue: new Date().toISOString().slice(0, 16),
      validators: [
        (val) => !val ? new Error("Required") : null,
        (val) => val.slice(0, 10) < new Date().toISOString().slice(0, 10) ? new Error("Date cannot be in the past") : null
      ]
    }
  })

  $formValue = signalFormValue(this.form)
  $formErrors = signalFormErrors(this.form)
  $formValid = signalFormValid(this.form)

  resetForm = () => resetSignalForm(this.form)
}
