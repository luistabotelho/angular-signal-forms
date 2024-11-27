# SignalForms

A simple library to manage forms using signals. Use the provided signalForm<T>() function to create a new SignalForm<T>.

# Info

Documentation being updated...

# Example Component

## Typescript
``` typescript
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
```

# HTML
``` html
<div>
    <label for="field1">Text Input 1</label>
    <br>
    <input 
    id="field1"
    type="text"
    (blur)="form.field1.touched.set(true)"
    [(ngModel)]="form.field1.currentValue">
    <br>
    Touched: {{form.field1.touched()}}
    <br>
    State: {{form.field1.state().state}} : {{form.field1.state().message}}
</div>
<br><br>
<div>
    <label for="field1Child">Text Input 2 Depends on Text Input 1</label>
    <br>
    <input 
    id="field1Child"
    type="text"
    (blur)="form.field1Child.touched.set(true)"
    [(ngModel)]="form.field1Child.currentValue">
    <br>
    Touched: {{form.field1Child.touched()}}
    <br>
    State: {{form.field1Child.state().state}} : {{form.field1Child.state().message}}
</div>
<br><br>
<div>
    <label for="field2">Text Input with no Validations</label>
    <br>
    <input 
    id="field2"
    type="text"
    (blur)="form.field2.touched.set(true)"
    [(ngModel)]="form.field2.currentValue">
    <br>
    Touched: {{form.field2.touched()}}
    <br>
    State: {{form.field2.state().state}} : {{form.field2.state().message}}
</div>
<br><br>
<div>
    <label for="dateField">Date Input</label>
    <br>
    <input 
    id="dateField"
    type="datetime-local"
    (blur)="form.dateField.touched.set(true)"
    [(ngModel)]="form.dateField.currentValue"
    >
    <br>
    Touched: {{form.dateField.touched()}}
    <br>
    State: {{form.dateField.state().state}} : {{form.dateField.state().message}}
</div>
<br><br>
<div>
    Form Valid: {{$formValid()}}
    <br>
    Current Value: {{$formValue() | json}}
    <br>
    All Errors: {{$formErrors() | json}}
    <br><br>
    <button (click)="resetForm()">Reset Form</button>
</div>
```