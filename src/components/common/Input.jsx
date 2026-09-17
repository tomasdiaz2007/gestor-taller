import React, { forwardRef } from 'react'

/**
 * @param {{
 *   label?: string,
 *   error?: string,
 *   id: string,
 *   type?: string,
 *   placeholder?: string,
 *   value?: any,
 *   onChange?: Function,
 *   required?: boolean,
 *   disabled?: boolean,
 *   min?: string,
 *   className?: string,
 * }} props
 */
const Input = forwardRef(function Input(
  { label, error, id, type = 'text', placeholder, value, onChange, required, disabled, min, className = '' },
  ref
) {
  return (
    <div className="field">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min={min}
        className={`field-input${error ? ' field-input--error' : ''} ${className}`}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  )
})

export default Input
