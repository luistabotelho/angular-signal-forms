import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isSignalFormValid, signalForm, signalFormValue, resetSignalForm } from 'signal-forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-signal-forms';

  form = signalForm({
    field1: {
      initialValue: ""
    },
    dateField: {
      initialValue: new Date()
    }
  })

  $formValue = signalFormValue(this.form)
  $formValid = isSignalFormValid(this.form)

  resetForm() {
    resetSignalForm(this.form)
  }
}
