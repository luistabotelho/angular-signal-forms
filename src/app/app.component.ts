import { Component } from '@angular/core';
import { signalForm, signalFormValue, signalFormValid, resetSignalForm } from '../../projects/signal-forms/src/public-api';
import { FormsModule } from '@angular/forms';

interface DataType {
  field1: string
  dateField: Date
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
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
        (val) => !RegExp(/^[A-Z]{1}/).test(val) ? new Error("First letter must be upper case") : null,
        (val) => val.length > 10 ? new Error("Must not exceed 10 characters") : null
      ]
    },
    dateField: {
      initialValue: new Date()
    }
  })

  $formValue = signalFormValue(this.form)
  $formValid = signalFormValid(this.form)

  resetForm() {
    resetSignalForm(this.form)
  }
}
