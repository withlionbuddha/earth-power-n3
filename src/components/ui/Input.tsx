import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import './ui.css'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  helperText?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, helperText, error, fullWidth = true, id, className = '', required, 'aria-describedby': describedBy, ...props }, ref) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = `${inputId}-description`
  return <div className={['ui-field', fullWidth && 'ui-field--full', className].filter(Boolean).join(' ')}>
    <label className="ui-field__label" htmlFor={inputId}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
    <input ref={ref} id={inputId} required={required} className={['ui-input', error && 'ui-input--error'].filter(Boolean).join(' ')} aria-invalid={error ? true : undefined} aria-describedby={[describedBy, (error || helperText) ? descriptionId : undefined].filter(Boolean).join(' ') || undefined} {...props} />
    {error ? <span className="ui-field__message ui-field__message--error" id={descriptionId} role="alert">{error}</span> : helperText ? <span className="ui-field__message" id={descriptionId}>{helperText}</span> : null}
  </div>
})

export default Input
