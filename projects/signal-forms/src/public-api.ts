/*
 * Public API Surface of signal-forms
 */

export {signalForm} from './lib/signal-forms.module'
export {signalFormGroup} from './lib/signal-form-group.module'

export {signalFormValid} from './lib/helpers/signal-form-valid.helper'
export {resetSignalForm} from './lib/helpers/reset-signal-form.helper'
export {signalFormValue} from './lib/helpers/signal-form-value.helper'
export {signalFormSetTouched} from './lib/helpers/signal-form-set-touched.helper'
export {signalFormErrors} from './lib/helpers/signal-form-errors.helper'

export {signalFormGroupErrors} from './lib/helpers/signal-form-group-errors.helper'
export {signalFormGroupValid} from './lib/helpers/signal-form-group-valid.helper'
export {signalFormGroupValue} from './lib/helpers/signal-form-group-value.helper'

export {SignalForm} from './lib/interfaces/signal-forms.interface'
export {SignalFormOptions} from './lib/interfaces/signal-forms-options.interface'
export {SignalFormDefinition} from './lib/interfaces/signal-forms-definition.interface'