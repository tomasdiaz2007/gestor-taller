import React, { forwardRef } from 'react'

/**
 * @param {{\
 *   label?: string,
 *   error?: string,
 *   id: string,
 *   type?: string,
 *   placeholder?: string,
 *   value?: any,
 *   onChange?: Function,
 *   required?: boolean,
 *   disabled?: boolean,
 *   min?: string | number,
 *   max?: string | number,
 *   maxLength?: number,
 *   inputMode?: string,
 *   className?: string,
 * }} props
 */
const Input = forwardRef(function Input(
  { label, error, id, type = 'text', placeholder, value, onChange, required, disabled, className = '', ...rest },
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
        className={`field-input${error ? ' field-input--error' : ''} ${className}`}
        {...rest}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  )
})

export default Input
