import { Component, computed } from '@angular/core';
import { signalForm, signalFormValue, signalFormValid, resetSignalForm, signalFormSetTouched, signalFormGroup, signalFormErrors, signalFormGroupErrors, signalFormGroupValid, signalFormGroupValue, Email, MaxLength, MinLength, RegExp, Required } from 'signal-forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface DataType {
  field1: string
  field1Child: string
  field2: string
  dateField: string
}

interface TableItem {
  id: string
  name: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  form = signalForm<DataType>({
    field1: {
      initialValue: "",
      validators: [
        Required(),
        MinLength(2),
        RegExp(/^[A-Z]{1}/, "First digit must be upper case letter"),
        MaxLength(10)
      ]
    },
    field1Child: {
      initialValue: "",
      validators: [
        (val, form) => !val && form.field1.$currentValue() ? new Error("Required if Field 1 contains a value") : null,
        Email()
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

  $tableData = signalFormGroup<TableItem>({
    id: {
      initialValue: '',
      validators: [
        val => !val ? new Error('Required') : null
      ]
    },
    name: {
      initialValue: '',
      validators: undefined
    }
  })

  $tableValid = signalFormGroupValid(this.$tableData)
  $tableErrors = signalFormGroupErrors(this.$tableData)
  $tableValue = signalFormGroupValue(this.$tableData)

  $completeValid = computed(() => this.$formValid() && this.$tableValid())
  $completeErrors = computed(() => [...this.$formErrors(), ...this.$tableErrors()])
  $completeValue = computed(() => ({
    ...this.$formValue(),
    table: [
      ...this.$tableValue()
    ]
  }))

  resetForm = () => {
    resetSignalForm(this.form)
    this.$tableData.$data.set([])
  }
  
  submit() {
    signalFormSetTouched(this.form)
    this.$tableData.$data().forEach(tableForm => {
      signalFormSetTouched(tableForm)
    })
    if (!this.$completeValid()) {
      return
    }
    // submit to server
  }
}
